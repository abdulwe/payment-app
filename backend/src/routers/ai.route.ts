import Router from "express";
import {askApi} from "../controllers/ai.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const aiRouter = Router();

aiRouter.post("/ask", authMiddleware,askApi);
export default aiRouter;
