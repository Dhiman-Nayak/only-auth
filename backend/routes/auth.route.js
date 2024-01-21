import express from "express";
import { signup,login ,profile} from "../controllers/auth.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/u").get(verifyJWT,profile);
// router.post("/signup",signup)
export default router;
