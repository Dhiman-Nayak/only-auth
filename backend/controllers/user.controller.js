import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
const updateUser = asyncHandler(async (req, res) => {
  const {avatar,email,fullName}=req.body;
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {
    $set: {
      fullName: fullName,
      avatar: avatar,
      email:email 
    },
  }).select("-password");
  return res.json(new ApiResponse(202, updateUser, "User updated successfully"))
});

const updateUserPassword = asyncHandler(async (req, res) => {
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

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the authenticated user is the owner of the account
    if (req.user.id !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "You can delete only your account" });
    }
    // Delete the user
    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is missing");
  }

  //TODO: delete old image - assignment

  const avatar = await uploadCloudinary(avatarLocalPath);

  if (!avatar.url) {
      throw new ApiError(400, "Error while uploading on avatar");
  }

  const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
          $set: {
              avatar: avatar.url,
          },
      },
      { new: true }
  ).select("-password");

  return res
      .status(200)
      .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});
export { updateUser, updateUserPassword, deleteUser,updateUserAvatar };
