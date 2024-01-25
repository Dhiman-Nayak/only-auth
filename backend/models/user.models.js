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
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBXNuO6PezhC18aYH_2cYtS0I7KbxoKYdwA&usqp=CAU"
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