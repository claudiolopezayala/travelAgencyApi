import { Router } from "express";
import { logIn, signUp, verifyEmail } from "../controller/auth-controller";
import { validationBody } from "../middleware/validation";
import { signUpLogInValidation } from "../validations/auth-validations";

const authRouter = Router();

authRouter.post("/logIn", validationBody(signUpLogInValidation), logIn);
authRouter.post("/signUp", validationBody(signUpLogInValidation), signUp);
authRouter.get("/verify-email/:token", verifyEmail);

export default authRouter;
