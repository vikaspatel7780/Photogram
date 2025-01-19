import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UploadImage } from "../models/uploadImage.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadImage = asyncHandler(async (req, res) => {
  const { imageName,userId} = req.body;
  if (imageName === "") {
    return res.status(404).json({
      message: "Image Name is required",
      success: false
  })
  }

  const imageLocalPath = req.files?.imageUrl[0]?.path;
  if (!imageLocalPath) {
    return res.status(401).json({
      message: "Image file Name is required",
      success: false
  })
  }
  const imageUrl = await uploadOnCloudinary(imageLocalPath);
  if (!imageUrl) {
    return res.status(400).json({
      message: "Image file is required",
      success: false
  })
  }
  const UploadImage1 = await UploadImage.create({
    imageName,
    imageUrl: imageUrl.url,
    userId:userId

  });
  if (!UploadImage1) {
    return res.status(404).json({
      message: "Something went wrong while Uploading the Image",
      success: false
  })
  }
  res.status(200)
    .json(new ApiResponse(200, UploadImage1, "Uploading Image Successfully"));
});

const getImage = asyncHandler(async (req, res) => {
  const allImages = await UploadImage.find().populate('userId')
  if (allImages.length > 0) {
    res
      .status(200)
      .json(new ApiResponse(200, allImages, "Image retrieved successfully"));
  } else {
    throw new ApiError(404, "No products found");
  }
});

export { uploadImage, getImage };
