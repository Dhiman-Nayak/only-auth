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
// import { auth } from 'express-openid-connect';
import {auth } from 'express-openid-connect'
console.log(process.env.issuerBaseURL);
const configg = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.secret,
    baseURL: process.env.baseURL,
    clientID: process.env.clientID,
    issuerBaseURL: process.env.issuerBaseURL
  };
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use(auth(configg))

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

// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,'client','index.html'))
// })
function requiresAuth() {
    return (req, res, next) => {
      if (req.oidc.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route
      } else {
        res.redirect('/login'); // User is not authenticated, redirect to the login page
      }
    };
  }
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

app.get('/profile', requiresAuth(), (req, res) => {
    
    console.log(JSON.stringify(req.oidc.user));
    console.log(res);
    res.send(JSON.stringify(req.oidc.user));
}); 