import OpenAi from "openai";
import { Completions } from "openai/resources";
const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
})

        export const categorizeTransaction  = async (description: string) => {
            const completion = await openai.chat.completions.create({
                model: "gpt-4.1-mini",
                messages:[
                    {
                        role:"system",
                        content:"You are categorizes financial transactions into one-word categories like: Food, Transportation, Entertainment, Utilities, Health, Education, and others etc."
                    },
                    {
                    role:"user",
                    content:`categories this Transaction: ${description}`
                }]
            })
            return completion.choices[0]?.message.content?.trim();
        }
                
   