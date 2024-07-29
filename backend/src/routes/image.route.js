import { Router } from "express";
import {uploadImage, getImage} from '../controllers/image.controller.js'
import { upload } from "../middlewares/multer.middleware.js";
import {registerUser,loginUser,changeCurrentPassword, logoutUser, getCurrentUser} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


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
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/getImage").get(getImage)


router.route("/changePassword").post(verifyJWT,changeCurrentPassword);
router.route("/profile").post(verifyJWT,getCurrentUser);

export default router