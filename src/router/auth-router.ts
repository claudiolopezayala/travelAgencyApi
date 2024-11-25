import { Router } from "express";
import { logIn, signUp } from "../controller/auth-controller";

const authRouter = Router()

authRouter.post("/logIn", logIn)
authRouter.use("/signUp", signUp)

export default authRouter