import Joi from "joi";

export const createTripValidation = Joi.object({
  id_user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.base": "El ID de usuario debe ser un texto",
    "string.empty": "El ID de usuario no puede estar vacío",
    "string.pattern.base": "El ID de usuario debe ser un ID de MongoDB válido",
    "any.required": "El ID de usuario es requerido",
  }),
  trip: Joi.object({
    place: Joi.string().max(150).required().messages({
      "string.base": "El lugar debe ser un texto",
      "string.empty": "El lugar no puede estar vacío",
      "string.max": "El lugar debe tener como máximo 150 caracteres",
      "any.required": "El lugar es requerido",
    }),
    description: Joi.string().max(500).required().messages({
      "string.base": "La descripción debe ser un texto",
      "string.empty": "La descripción no puede estar vacía",
      "string.max": "La descripción debe tener como máximo 500 caracteres",
      "any.required": "La descripción es requerida",
    }),
    lat: Joi.number().min(-90).max(90).required().messages({
      "number.base": "La latitud debe ser un número",
      "number.min": "La latitud no puede ser menor a -90",
      "number.max": "La latitud no puede ser mayor a 90",
      "any.required": "La latitud es requerida",
    }),
    lng: Joi.number().min(-180).max(180).required().messages({
      "number.base": "La longitud debe ser un número",
      "number.min": "La longitud no puede ser menor a -180",
      "number.max": "La longitud no puede ser mayor a 180",
      "any.required": "La longitud es requerida",
    }),
  }).required().messages({
    "object.base": "El viaje debe ser un objeto",
    "any.required": "El viaje es requerido",
  }),
});
