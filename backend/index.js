import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()
dotenv.config()
import connectDB from "./db/index.js"
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

app.use(cookieParser())
app.use(express.json())
app.use(cors())

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Running on ${process.env.PORT}`);
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.use("/users",userRoute)
app.use("/api/users",authRoute)
