import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const updateUser=asyncHandler(async (req,res)=>{

    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        $set:{
            fullName:req.body.fullName,
            password:req.body.password
        }
    })
});

const updateUserPassword=asyncHandler(async (req,res)=>{

    const { oldPassword, newPassword } = req.body;
    if (oldPassword === newPassword)
        return res.json(new ApiError(400, "Both are same password"));
    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        return res.json(new ApiError(400, "Old password is not correct"));
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});


const deleteUser=asyncHandler(async (req,res)=>{
    console.log("gg");
    // if(req.user.id !==req.params.id){
    //     return res.json(new ApiError(401,"you can delete only your account"))
    // }
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json(new ApiError(200,"Account has benn deleted"))
    } catch (error) {
        console.log(error);
        return res.status(402).json(new ApiError(200,error))
        
    }

});

export {updateUser,updateUserPassword,deleteUser}