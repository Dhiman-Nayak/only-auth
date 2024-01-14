import { User } from "../models/user.models.js";

const signup = async(req, res) => {
    try {
        const { userName, fullName, email, password,avatar } = req.body;
        if(!userName || !email || !password){
            throw new error 
        }
        const newUser = new User({ userName, fullName, email, password,avatar });
        await newUser.save();
        return res
        .status(200)
        .json(newUser)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export { signup };
