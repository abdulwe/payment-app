import Router from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { addMoney } from "../controllers/wallet.controller";

const walletrouter = Router();

walletrouter.post("/fund", authMiddleware, addMoney);
export default walletrouter;