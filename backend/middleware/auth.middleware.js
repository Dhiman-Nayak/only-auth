import {User} from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.access-token || req.header("Authorization")?.replace("Bearer","")
        if(!token){
            throw new ApiError(400,"Unauthorised request")
        }
    
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY)    
        console.log(process.env.JWT_SECRET_KEY);
        const user =await User.findById(decodeToken?._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(400,"Invalid Access token")
        }
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401,"You are not logged in")
    }

})

export default verifyJWT;