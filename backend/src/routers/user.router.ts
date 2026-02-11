import { Router } from "express";
import {authMiddleware} from "../middleware/auth.middleware";
import {profile} from "../controllers/user.controller";



const userRouter = Router();

userRouter.get("/profile", authMiddleware, profile);

export default userRouter;