import express  from "express";
import dotenv from "dotenv"
const app = express()
dotenv.config()
import connectDB from "./db/index.js"
import userRoute from "./routes/user.route.js";

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Running");
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.use("/api/users",userRoute)