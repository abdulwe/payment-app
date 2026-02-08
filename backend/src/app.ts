import express from "express";
import userRouter  from "./routers/user.router";
import authRouter  from "./routers/auth.router";

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Welcome to the Kiddo Fintech API")
})
app.use("/api/users/register", userRouter);
app.use("/api/auth", authRouter);

export default app;