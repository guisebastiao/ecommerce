import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, "Informe seu email").email("Email inválido").max(250, "Seu email tem que ser menor do que 250 caracteres"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .nonempty("Informe sua senha")
      .min(6, "Sua senha tem que ser maior do que 6 caracteres")
      .max(20, "Sua senha tem que ser menor do que 20 caracteres")
      .regex(/.*[A-Z].*/, "Sua senha deve ter uma letra maiúscula")
      .regex(/.*\d.*\d.*/, "Sua senha deve ter dois números")
      .regex(/.*[@$!%*?&.#].*/, "Sua senha deve ter um caractere especial"),
    confirmPassword: z
      .string()
      .nonempty("Repita sua senha")
      .min(6, "Sua senha tem que ser maior do que 6 caracteres")
      .max(20, "Sua senha tem que ser menor do que 20 caracteres")
      .regex(/.*[A-Z].*/, "Sua senha deve ter uma letra maiúscula")
      .regex(/.*\d.*\d.*/, "Sua senha deve ter dois números")
      .regex(/.*[@$!%*?&.#].*/, "Sua senha deve ter um caractere especial"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type ForgotPasswordRequestDTO = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordRequestDTO = z.infer<typeof resetPasswordSchema>;
