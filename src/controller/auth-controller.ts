import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const logIn = (req: Request, res: Response)=>{
  res.json("ok").status(StatusCodes.OK)
}