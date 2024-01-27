import {User} from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        console.log("gg",req.cookies);
        if(!token){
            return res.status(400).json(new ApiError(400,"Unauthorised request"))
        }
    
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY)    
        console.log(process.env.JWT_SECRET_KEY);
        const user =await User.findById(decodeToken?._id).select("-password -refreshToken")
        if(!user){
            return res.json(new ApiError(400,"Invalid access token"))
        }
        req.user=user;
        next()
    } catch (error) {
        console.log(error);
        return res.json(new ApiError(401,"you're not logged in"))
        // next(error)
    }

})

export default verifyJWT;