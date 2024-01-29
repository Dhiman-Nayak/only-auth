import {User} from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';

const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token = req.params.cookies
        // const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        
        if(!token){
            return res.status(400).json(new ApiError(400,"Unauthorised request"))
        }
    
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET_KEY)    
        
        const user =await User.findById(decodeToken?.data).select("-password -refreshToken")
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