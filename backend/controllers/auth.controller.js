import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

const signup = asyncHandler(async (req, res) => {
    try {
        const { userName, fullName, email, password, avatar } = req.body;
        if (!userName || !email || !password) {
        throw new ApiError(401, "all the field are required");
        }

        const existingEmail = await User.findOne({ email });
        const existingUserName = await User.findOne({ userName });
        if (existingEmail || existingUserName) {
        throw new ApiError(400, "user already existed");
        }

        const newUser = new User({ userName, fullName, email, password, avatar });
        await newUser.save();

        const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken"
        );

        return res.status(200).json(createdUser);
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

const login = asyncHandler(async (req, res) => {
    try {
        const { password,name}=req.body;
        const user=await User.findOne({email:name}||{userName:name})
        if(!user){
            throw new ApiError(401,"User doesn't exist")
        }
        if(user.password!=password){
            throw new ApiError(401,"password doesn't match")
        }
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: user,
                },
                "User successfully logged in"
            )
        );
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

export { signup ,login};