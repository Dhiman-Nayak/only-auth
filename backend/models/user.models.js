import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
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

export const User= mongoose.model("User",userSchema)