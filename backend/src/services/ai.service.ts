import openAi from "openai";
 export const openai = new openAi({
    apiKey: process.env.OPENAI_API_KEY
})

export const generateAiResponse = async (prompt: string)=>{
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages:[{
                role:"user",
                content: prompt,
            },]
        })
        return completion.choices[0]?.message.content;
    } catch (error) {
        throw error;
    }
}