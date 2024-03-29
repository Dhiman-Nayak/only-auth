import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
// ----------------------
// ~~~ User Register
// ----------------------
const signup = asyncHandler(async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      // throw new ApiError(401, "");
      return res.json(new ApiError(400, "all the field are required"));
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json(new ApiError(400, "user already existed"));
    }
    const newUser = new User({ fullName, email, password });
    await newUser.save();

    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, "User successfully created"));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiError(401, "something went wrong"));
    // next(ApiError(300,"something went wrong"))
    // next()
  }
});

// ----------------------
// ~~~ User Login
// ----------------------
const login = asyncHandler(async (req, res) => {
  try {
    const { password, name } = req.body;
    const user = await User.findOne({
      $or: [
        { email: name }, // Match by email
        { userName: name }, // Match by userName
      ],
    });

    if (!user) {
      return res.json(new ApiError(401, "User doesn't exist"));
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.json(new ApiError(400, "Password is not correct"));
    }
    const user0 = await User.findById(user._id).select("-password  ");

    const payload = user0._id.toString();
    // const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 60;
    const expiresIn="7d"
    const token = jwt.sign(
      {
        data: payload,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn }
    );
    // console.log(token,"+++++",payload);
    // .cookie("access-token",token)
    return res.cookie('accessToken', token, {  httpOnly: true })
        .status(200)
        .json(
          new ApiResponse(
            200,
            {
              user: user0,
              token
            },
            "User successfully logged in"
          )
        )
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error sign in" });
  }
});

// ----------------------
// ~~~ Get Profile
// ----------------------
const profile = asyncHandler(async (req, res) => {
  console.log(req.header);
  res.status(200).json("hi");
});

const signout = asyncHandler(async (req, res) => {
  return res.clearCookie("accessToken").json(new ApiResponse(200,"signout success"))
});

export { signup, login, profile ,signout};
