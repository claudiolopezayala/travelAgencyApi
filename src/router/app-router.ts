import { Router } from "express";
import authRouter from "./auth-router";
import tripRouter from "./trip-router";

const appRouter = Router()

appRouter.use("/auth", authRouter)
appRouter.use("/trip", tripRouter)

export default appRouter