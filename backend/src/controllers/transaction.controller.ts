import type{Response} from "express";
import type{ AuthRequest } from "../middleware/auth.middleware";
import {prisma} from "../config/prisma";
import { categorizeTransaction } from "../services/transactionAi.service";



export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, description } = req.body;

    const userId = req.userId as string;

    const category = (await categorizeTransaction(description)) as string;

    await prisma.transaction.create({
      data: {
        amount,
        description,
        category,
        userId,
      },
    });
    res.status(201).json({ category });
  } catch (err) {
    res.status(500).json({
      message: "Transaction creation failed",
    });
  }
};