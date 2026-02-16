import Router from "express";
import {askApi, chatWithAI, getChatHistory} from "../controllers/ai.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const aiRouter = Router();

aiRouter.post("/ask", authMiddleware,askApi);
aiRouter.post("/chat", authMiddleware, chatWithAI);
aiRouter.get("/chat/chat-history", authMiddleware, getChatHistory);
export default aiRouter;
