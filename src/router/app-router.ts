import { Router } from "express";
import authRouter from "./auth-router";
import tripRouter from "./trip-router";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { swaggerOptions } from "../doc/app-swagger";

const swaggerDoc = swaggerJSDoc(swaggerOptions);
const appRouter = Router()

appRouter.use("/auth", authRouter)
appRouter.use("/trip", tripRouter)


appRouter.use(
  "/",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc),
);

export default appRouter