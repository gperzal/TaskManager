import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string({
      required_error: "El email es requerido",
      invalid_type_error: "El email es requerido"
  })
      .min(5, "El email es demasiado corto")
      .email("El formato del email no es válido")
      .max(64, "El email es demasiado largo")
      .toLowerCase()
      .trim(),
        
    password: z.string({
        required_error: "La contraseña es requerida",
        invalid_type_error: "La contraseña es requerida"
    })
        .nonempty("La contraseña es requerida")
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
    path: ["confirmPassword"],
});
export const loginSchema = z.object({
  email: z.string({
    required_error: "El email es requerido",
  })
    .min(1, "El email es requerido")  // Primero validamos que no esté vacío
    .email("El formato del email no es válido")
    .toLowerCase()
    .trim(),
    
  password: z.string({
    required_error: "La contraseña es requerida",
  })
    .min(1, "La contraseña es requerida")
});