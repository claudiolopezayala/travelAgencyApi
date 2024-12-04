import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../model/user-model";

export const getUsersTrip = async (req: Request, res: Response) : Promise<any> => {
  try {
    //TODO
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

export const createTrip = async (req: Request, res: Response) : Promise<any> => {
  try {
    const {id_user, trip} = req.body
    const user = await UserModel.findById(id_user)
    console.log(trip)
    if(!user){
      res.status(StatusCodes.NOT_FOUND).json({ error: "no se encontro el usuario" });
      return
    }

    user.visit.push(trip)
    await user.save()
    
    res.status(StatusCodes.OK).json({ message: "Trip added successfully" });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};