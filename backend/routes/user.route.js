import express from "express";
const router = express.Router();
import { updateUser,updateUserPassword,deleteUser } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

router.route("/update/:id").post(verifyJWT, updateUser);
router.route("/change-password/:id").post(verifyJWT, updateUserPassword);
router.route("/delete/:id").delete(verifyJWT, deleteUser);


export default router;
