import type { Request, Response } from "express";
import { generateAiResponse } from "../services/ai.service";


export const askApi = async(req:Request, res: Response) =>{
    try {
        const { prompt } = req.body;
        const response = await generateAiResponse(prompt);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: "Failed to generate AI response" });
    }
}