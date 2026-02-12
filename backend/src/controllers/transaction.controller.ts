import type{Response} from "express";
import type{ AuthRequest } from "../middleware/auth.middleware";
import {prisma} from "../config/prisma";
import { categorizeTransaction } from "../services/transactionAi.service";

export const createTransaction = async (req:AuthRequest, res:Response) => {
    try {
        const { description, amount } = req.body;
        const userId = req.userId as string;
        const category = await categorizeTransaction(description) as string;
        const transaction = await prisma.transaction.create({
            data: {
                userId,
                description,
                amount,
                category
            }
        })
        res.status(201).json({transaction});
    } catch (error) {
        res.status(500).json({ error: "Failed to create transaction" });
    }
}