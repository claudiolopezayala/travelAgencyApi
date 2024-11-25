import express from "express"
import { envs } from "./utils/dotenv"
import appRouter from "./router/app-router"

const app = express()

app.use("/", appRouter)

app.listen(envs.PORT, ()=>{
  console.log(`Server is running on port ${envs.PORT}`)
})