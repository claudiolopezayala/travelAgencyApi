import { Router } from "express";
import { logIn } from "../controller/auth-controller";

const authRouter = Router()

authRouter.post("/logIn", logIn)

export default authRouter