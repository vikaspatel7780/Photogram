import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import dotenv from 'dotenv';

dotenv.config();

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
  
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.replace("Bearer ", "");
      
 

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized request",
        success: false,
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        // console.log(token);
        return res.status(401).json({
          message: "Unauthorized request",
          success: false,
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        message: "Token verification failed",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized request",
      success: false,
    });
  }
});

export { verifyJWT };
