import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        reuired:true,
        unique:true
    },
    fullName:{
        type:String,
        reuired:true,
        unique:true
    },
    email:{
        type:String,
        reuired:true,
        unique:true
    },
    password:{
        type:String,
        reuired:true,
        // unique:true
    },
    avatar:{
        type:String,
        reuired:true,
        unique:true
    },

},{timeseries:true})


// userSchema.pre("save",(next)=>{
//     const user = this;
//     if(!user.isModified('password')){
//         next()
//         return;
//     }

//     try {
//         const salt = 9;
//         const genPassword= bcryptjs.hashSync(user.password,salt);
//         user.password=genPassword;
//     } catch (error) {
//         next(error)
//     }
// })
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password=  bcryptjs.hashSync(this.password,10)
    next()    
})

userSchema.methods.isPasswordCorrect= async  function (password) {
    return await bcryptjs.compare(password,this.password)
}

export const User= mongoose.model("User",userSchema)