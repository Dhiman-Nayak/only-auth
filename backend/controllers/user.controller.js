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
    const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    // console.log("user->",user);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    // console.log("req.user.id->",req.user.id);
    // Check if the authenticated user is the owner of the account
    if (req.user.id !== userId) {
      return res.status(403).json({ success: false, message: 'You can delete only your account' });
    }
    // console.log("req.user.id->",req.user);
    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

});

export {updateUser,updateUserPassword,deleteUser}