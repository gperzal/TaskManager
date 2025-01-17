import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string({
    required_error: "El email es requerido",
  })
    .email("El formato del email no es válido")
    .min(5, "El email es demasiado corto")
    .max(64, "El email es demasiado largo")
    .toLowerCase()
    .trim(),
    
  password: z.string({
    required_error: "La contraseña es requerida",
  })
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña no puede exceder los 32 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/,
      "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
    ),

  confirmPassword: z.string({
    required_error: "La confirmación de contraseña es requerida",
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // Esto hará que el error se asocie al campo confirmPassword
});

export const loginSchema = z.object({
  email: z.string({
    required_error: "El email es requerido",
  })
    .email("El formato del email no es válido")
    .toLowerCase()
    .trim(),
    
  password: z.string({
    required_error: "La contraseña es requerida",
  })
    .min(1, "La contraseña es requerida")
});