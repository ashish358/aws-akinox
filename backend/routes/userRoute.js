import express from "express";
import { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.get("/profile", getUserProfile);
userRouter.put("/update-profile", updateUserProfile);


export default userRouter;
