import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    },
    imageName:{
        type:String,
        required:true
    },
})

export const UploadImage = mongoose.model("UploadImage",ImageSchema);