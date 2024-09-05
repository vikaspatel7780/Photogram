import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();
const options = {
  httpOnly: true,
  secure: process.env.PRODUCTION === "development", // Use secure cookies in production
  sameSite: 'None' // Ensure cross-origin requests are handled
};
console.log(options)
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    if (!userId) {
      throw new ApiError(400, "Invalid user ID");
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, "Something went wrong while generating refresh and access tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, username } = req.body;
  if (fullName === "" || email === "" || password === "" || username === "") {
    return res.status(400).json({
      message: "Please fill all the fields.",
      success: false
    });
  }

  const existedUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existedUser) {
    return res.status(409).json({
      message: "User with email or username already exists.",
      success: false
    });
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    return res.status(500).json({
      message: "Something went wrong while registering the user",
      success: false
    });
  }
  return res.status(200).json(new ApiResponse(200, req.body, "User fetched successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username && !email) {
    return res.status(400).json({
      message: "All fields are required.",
      success: false
    });
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    return res.status(404).json({
      message: "User does not exist.",
      success: false
    });
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid password.",
      success: false
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (oldPassword === "" || newPassword === "") {
    return res.status(400).json({
      message: "Please fill all the fields.",
      success: false
    });
  }

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid old password",
      success: false
    });
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(401).json({
      message: "Unauthorized request",
      success: false,
    });
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res.status(401).json({
        message: "Invalid refresh token",
        success: false,
      });
    }

    if (incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json({
        message: "Refresh token is expired or used",
        success: false,
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        statusCode: 200,
        data: { accessToken, refreshToken: newRefreshToken },
        message: "Access token refreshed",
      });
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Invalid refresh token",
      success: false,
    });
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(500, "Something Went Wrong");
  }
  return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

const getOtherProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  try {
    const users = await User.find({ username: { $ne: username } }).select("-password -refreshToken");
    if (users.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }
    return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

export {
  registerUser,
  loginUser,
  changeCurrentPassword,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  getOtherProfile
};
