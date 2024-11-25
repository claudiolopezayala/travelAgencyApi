import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { UserModel } from "../model/user-model"
import { generate } from "generate-password"
import { hash } from "bcrypt"
import { envs } from "../utils/dotenv"

export const logIn =async (req: Request, res: Response)=>{
  res.json("ok").status(StatusCodes.OK)
}

export const signUp =async (req: Request, res: Response)=>{
  try{
    const {email, password} = req.body
    
    let token:string;
    let existingToken: any = null;

    do{
      token = generate({
        length: 20,
        numbers: true,
        uppercase: false,
        lowercase: false,
        symbols: false
      });

      existingToken = await UserModel.findOne({verificationToken: token})
    }while (existingToken)

    const saltedPassword = await hash(password, envs.SALT)

    const insertionResponse = await UserModel.create({
      email: email,
      password: saltedPassword,
      verificationToken: token,
    })
    res.json(insertionResponse).status(StatusCodes.OK)
  }catch(e){
    res.json(e).status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}