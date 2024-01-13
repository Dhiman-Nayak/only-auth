import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const app= express()

const connectDB = async ()=>{
    try {
        const connectionInstance=await mongoose.connect(`${process.env.MONGO_URI}/Auth`)
        console.log(`Mongodb connected .. Db Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1)
    }
 }

 export default connectDB;