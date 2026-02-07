import express from "express";
import userRouter  from "./routers/user.router";
const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Welcome to the Kiddo Fintech API")
})
app.use("/api/users/register", userRouter);
export default app;