import {Router} from "express";
import { createTransaction } from "../controllers/transaction.controller";
import { authMiddleware} from "../middleware/auth.middleware";


const transactionRouter = Router();

transactionRouter.post("/", authMiddleware, createTransaction);

export default transactionRouter;
