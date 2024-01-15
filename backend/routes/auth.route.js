import express from "express";
import { signup,login } from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
// router.post("/signup",signup)
export default router;
