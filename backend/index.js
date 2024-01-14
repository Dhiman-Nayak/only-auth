import express  from "express";
import dotenv from "dotenv"
const app = express()
dotenv.config()
import connectDB from "./db/index.js"
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

app.use(express.json())

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Running");
    })
}).catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.use("/users",userRoute)
app.use("/api/users",authRoute)