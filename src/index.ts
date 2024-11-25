import express from "express"
import { envs } from "./utils/dotenv"
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

const app = express()

app.get("/",(req: Request, res: Response)=>{
  res.json("ok").status(StatusCodes.OK)
})

app.listen(envs.PORT, ()=>{
  console.log(`Server is running on port ${envs.PORT}`)
})