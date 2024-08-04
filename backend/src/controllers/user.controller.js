import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    // Ensure the userId is valid and not null or undefined
    if (!userId) {
      throw new ApiError(400, "Invalid user ID");
    }

    const user = await User.findById(userId);

    // Ensure the user exists
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    // Provide more specific error information if available
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};


const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, password, username } = req.body;
  if (fullName === "" || email === "" || password === "" || username === "") {
    return res.status(409).json({
      message: "Please fill all the fields.",
      success: false
  })
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    return res.status(409).json({
      message: "User with email or username already exists.",
      success: false
  })
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    res.status(500)
    .json({
      message: "Something went wrong while registering the user",
      success: false
    })
  }
  return res
    .status(200)
    .json(new ApiResponse(200, req.body, "User fetched successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  const { username, email, password } = req.body;
  
  if (!username && !email) {
    return res.status(401).json({
      message: "All fields are required.",
      success: false
  })
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User does not exist.",
      success: false
  })
   
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    return res.status(404).json({
      message: "Invalid password.",
      success: false
  })
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

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
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
 if(oldPassword ==="" || newPassword === ""){
    return res.
    status(404)
    .json({
      message:"Please fill all the fields.",
      success: false
    })
  }

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  
  
  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invailed Old Password",
      success: false
  })
   
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
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

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    };

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
  const user = await User.findById(req.user._id).select(
  "-password -refreshToken"
  );
  if (!user) {
    throw ApiError(200, "Something Went Worng");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User Get Successfully"));
});

const getOtherProfile = asyncHandler(async (req, res) =>{
  const { username } = req.params;
  try {
    const user = await User.find({ username:{ $ne: username } }).select(
      "-password -refreshToken"
      );
    if (!user) {
      res.status(404)
      .json({
        message:"User Not Fount",
        success: false,
      })
    }
    return res
    .status(200)
    .json(new ApiResponse(200, user, "User Get Successfully"));


  } catch (error) {
    res.status(500).send('Server error');
  }
})

export {
  registerUser,
  loginUser,
  changeCurrentPassword,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  getOtherProfile
};
