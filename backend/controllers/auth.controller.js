import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";

const signup = asyncHandler(async (req, res,next) => {
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

        return res.status(200).json(new ApiResponse(200,createdUser,"User successfully created"));

    }catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(401,"something went wrong"));
        // next(ApiError(300,"something went wrong"))
        next()
    }
});

const login = asyncHandler(async (req, res) => {
    try {
        const { password,name}=req.body;
        const user = await User.findOne({
            $or: [
              { email: name },    // Match by email
              { userName: name }  // Match by userName
            ]
          });
        if(!user){
            throw new ApiError(401,"User doesn't exist")
        }
        if(user.password!=password){
            throw new ApiError(401,"password doesn't match")
        }
        const user0 = await User.findById(user._id).select(
            "-password -refreshToken"
            );

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: user0,
                },
                "User successfully logged in"
            )
        );
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

const profile=asyncHandler(async(req,res)=>{
    
})

export { signup ,login};