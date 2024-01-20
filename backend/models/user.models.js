import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        reuired:true,
        // unique:true
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
        // reuired:true,
        // unique:true
    },

},{timeseries:true})



userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();

    this.password=  bcryptjs.hashSync(this.password,10)
    next()    
})

userSchema.methods.isPasswordCorrect= async  function (password) {
    return await bcryptjs.compare(password,this.password)
}

export const User= mongoose.model("User",userSchema)