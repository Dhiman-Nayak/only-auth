import express  from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express()
dotenv.config()
import connectDB from "./db/index.js"
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import path from "path"

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

const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,'/client/dist')))
app.use("/api/users",userRoute)
app.use("/api/users",authRoute)

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','index.html'))
})