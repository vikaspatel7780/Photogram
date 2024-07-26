import { v2 as cloudinary } from 'cloudinary'; // Cloudinary v2 ka import statement
import fs from 'fs'; // File system module ka import

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary cloud name environment variable se
    api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key environment variable se
    api_secret: process.env.CLOUDINARY_API_SECRET  // Cloudinary API secret environment variable se
});

const uploadOnCloudinary =async (localFilePath) =>{
    try {
        if(!localFilePath){
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto'
        })
        console.log('file uploaded Successfully on CLoudinary:', response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return false; 
    }
}

export  {uploadOnCloudinary}