 import type{  Response} from "express";
 import {prisma} from "../config/prisma";
 import { authMiddleware, type AuthRequest } from "../middleware/auth.middleware";

 export const profile =async (req:AuthRequest, res: Response) =>{
try {
    const user = await prisma.user.findUnique({
        where:{
            id: req.userId as string
        }
       
    })
     res.json({
        user
     })
} catch (error) {
    res.status(500).json({ error: "Failed to retrieve user profile" });
}
   
    return res.send("user profile endpoint")
}