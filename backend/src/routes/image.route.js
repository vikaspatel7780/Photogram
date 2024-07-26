import { Router } from "express";
import {uploadImage, getImage} from '../controllers/image.controller.js'
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();
router.route("/uploadImage").post(
    
    upload.fields([
        {
            name:"imageUrl",
            maxCount:1
        }
    ]),
    uploadImage
)

router.route("/getImage").post(getImage)
export default router