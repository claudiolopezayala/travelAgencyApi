import { Router } from "express";
import { validationBody } from "../middleware/validation";
import { signUpLogInValidation } from "../validations/auth-validations";
import { createTrip } from "../controller/trip-controller";
import { createTripValidation } from "../validations/trip-validations";

const tripRouter = Router();

tripRouter.post("/", validationBody(createTripValidation), createTrip);

export default tripRouter;
