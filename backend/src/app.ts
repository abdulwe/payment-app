import express from "express";
import cors from "cors";

import userRouter  from "./routers/user.router";
import authRouter  from "./routers/auth.router";
import aiRouter  from "./routers/ai.route";
import transactionRouter from "./routers/transaction.route";

const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(cors({
    origin:"http://localhost:3000",//frontend url(nextjs app )
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,//if u wanted to use cookies for authentication
    allowedHeaders:["Content-Type", "Authorization"]


}))
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Welcome to the Kiddo Fintech API")
})
app.use("/api/users/", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);
app.use("/api/transactions", transactionRouter);

export default app;