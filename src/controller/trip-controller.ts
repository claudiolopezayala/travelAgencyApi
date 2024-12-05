import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../model/user-model";

/**
 * @swagger
 * /trip/{id_user}:
 *   post:
 *     summary: Obtener los viajes de un usuario
 *     tags:
 *       - Viajes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_user
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de viajes del usuario
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autenticado
 */
export const getUsersTrip = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { id_user } = req.params;

    const user = await UserModel.findById(id_user);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    res.status(StatusCodes.OK).json({ trips: user.visit });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

/**
 * @swagger
 * /trip/:
 *   post:
 *     summary: Crear un nuevo viaje
 *     tags:
 *       - Viajes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_user
 *               - trip
 *             properties:
 *               id_user:
 *                 type: string
 *                 pattern: '^[0-9a-fA-F]{24}$'
 *               trip:
 *                 type: object
 *                 required:
 *                   - place
 *                   - description
 *                   - lat
 *                   - lng
 *                 properties:
 *                   place:
 *                     type: string
 *                     maxLength: 150
 *                   description:
 *                     type: string
 *                     maxLength: 500
 *                   lat:
 *                     type: number
 *                     minimum: -90
 *                     maximum: 90
 *                   lng:
 *                     type: number
 *                     minimum: -180
 *                     maximum: 180
 *     responses:
 *       201:
 *         description: Viaje creado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 *       401:
 *         description: No autenticado
 */
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