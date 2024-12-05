import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../model/user-model";
import { generate } from "generate-password";
import { hash, compare } from "bcryptjs";
import { envs } from "../utils/dotenv";
import { EmailService } from "../utils/mailService";

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     summary: Registrarse
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
export const signUp = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already exists" });
    }

    let token: string;
    let existingToken: any = null;

    do {
      token = generate({
        length: 20,
        numbers: true,
        uppercase: false,
        lowercase: true,
        symbols: false,
      });
      existingToken = await UserModel.findOne({ verificationToken: token });
    } while (existingToken);

    const saltedPassword = await hash(password, envs.SALT);

    const user = await UserModel.create({
      email,
      password: saltedPassword,
      verificationToken: token,
      tokenHasBeenSent: false,
    });

    const emailService = new EmailService();
    await emailService.sendEmail({
      to: envs.MAILER_EMAIL,
      subject: 'Cuenta creada correctamente',
      htmlBody: `Code: ${token}`
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User created, verify your email to log in" });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/verify-email/{token}:
 *   get:
 *     summary: Verificar correo electrónico
 *     tags:
 *       - Autenticación
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de verificación de correo electrónico
 *     responses:
 *       200:
 *         description: Correo electrónico verificado exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
export const verifyEmail = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { token } = req.params;

    const user = await UserModel.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid or expired token" });
    }

    user.isVerified = true
    await user.save()

    res.status(StatusCodes.OK).json({ message: "Email verified successfully" });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

/**
 * @swagger
 * /auth/logIn:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Sesión iniciada exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
export const logIn = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Please verify your email to log in" });
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email or password" });
    }

    res.status(StatusCodes.OK).json({ message: "Logged in successfully", payload: user._id });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
