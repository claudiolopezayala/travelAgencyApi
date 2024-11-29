import { Router } from "express";
import { logIn, signUp, verifyEmail } from "../controller/auth-controller";

const authRouter = Router();

authRouter.post("/logIn", logIn);
authRouter.post("/signUp", signUp);
authRouter.get("/verify-email/:token", verifyEmail);

export default authRouter;
