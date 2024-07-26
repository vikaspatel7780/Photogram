import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UploadImage } from "../models/uploadImage.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadImage = asyncHandler(async (req, res) => {
  const { imageName } = req.body;
  if (imageName === "") {
    throw new ApiError(404, "Image Name is required");
  }

  const imageLocalPath = req.files?.imageUrl[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Image file is required");
  }
  const imageUrl = await uploadOnCloudinary(imageLocalPath);
  if (!imageUrl) {
    throw new ApiError(400, "Image file is required");
  }
  const UploadImage1 = await UploadImage.create({
    imageName,
    imageUrl: imageUrl.url,
  });
  if (!UploadImage1) {
    throw new ApiError(500, "Something went wrong while Uploading the Image");
  }
  res
    .status(200)
    .json(new ApiResponse(200, UploadImage1, "Uploading Image Successfully"));
});

const getImage = asyncHandler(async (req, res) => {
  const allImages = await UploadImage.find();
  if (allImages.length > 0) {
    res
      .status(200)
      .json(new ApiResponse(200, allImages, "Products retrieved successfully"));
  } else {
    throw new ApiError(404, "No products found");
  }
});

export { uploadImage, getImage };
