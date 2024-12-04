import { Router } from "express";
import { validationBody } from "../middleware/validation";
import { signUpLogInValidation } from "../validations/auth-validations";
import { createTrip } from "../controller/trip-controller";

const tripRouter = Router();

tripRouter.post("/", createTrip);

export default tripRouter;
