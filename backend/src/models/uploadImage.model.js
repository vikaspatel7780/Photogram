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
    like:{
        type:Array,
        default:[]
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
},
    {
        timestamps:true
    }
)

export const UploadImage = mongoose.model("UploadImage",ImageSchema);