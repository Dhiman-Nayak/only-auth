import express from "express"
const router = express.Router();
import { signup } from "../controllers/user.controller.js";
router.route("/").get(signup)

export default router;