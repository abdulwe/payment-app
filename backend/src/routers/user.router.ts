import { Router } from "express";
import { homePage } from "../controllers/user.controller";

const userRouter = Router();
userRouter.post("/", homePage)
export default userRouter;