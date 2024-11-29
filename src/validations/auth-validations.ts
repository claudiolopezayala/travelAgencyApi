import Joi from "joi";

export const signUpLogInValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "El correo debe ser de tipo texto",
    "string.empty": "El correo no puede estar vacío",
    "string.email": "El correo tiene que ser un correo valido",
    "any.required": "El correo es requerido",
  }),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/)
    .required()
    .messages({
      "string.base": "La contraseña debe ser de tipo texto",
      "string.empty": "La contraseña usuario no puede estar vacía",
      "string.min": "La contraseña debe tener al menos 8 caracteres",
      "string.pattern.base":
        "La contraseña debe tener al menos una letra minúscula, una letra mayúscula, un número y un caracter especial",
      "any.required": "La contraseña de usuario es requerida",
    })
})