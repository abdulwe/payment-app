import type { Response } from "express";
import  {prisma}  from "../config/prisma"
import type{ AuthRequest } from "../middleware/auth.middleware";

export const addMoney = async(req:AuthRequest, res:Response) => {
    try {
        const userId = req.userId as string;
        const {amount} = req.body;
        if(!amount || amount <= 0){
            return res.status(400).json({error: "Invalid amount"})
        }
        const wallet = await prisma.wallet.findFirst({
            where:{userId},
        });
        if(!wallet)
        {
            return res.status(404).json({error: "Wallet not found"})
        }
        const [updatedWallet] = await prisma.$transaction([
            prisma.wallet.update({
                where:{id: wallet.id},
                data:{balance: wallet.balance + Number(amount)}
            }),
            prisma.transaction.create({
                data:{
                    userId,
                    amount: Number(amount),
                    description: "Wallet funding",
                    category: "Funding"
                }
            })
        ])
        res.status(200).json(updatedWallet);
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
    }

