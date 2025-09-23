import { acceptMimetypes } from "@/utils/acceptMimetypes";
import z from "zod";

export const updateAccountSchema = z.object({
  name: z.string().trim().nonempty("Informe seu nome").min(3, "Seu nome tem que ser maior do que 3 caracteres").max(100, "Seu nome tem que ser menor de 100 caracteres"),
  surname: z.string().trim().nonempty("Informe seu sonbrenome").min(3, "Seu sobrenome tem que ser maior do que 3 caracteres").max(100, "Seu sobrenome tem que ser menor de 100 caracteres"),
  phone: z
    .string()
    .nonempty("Informe seu número de telefone")
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => /^\d{13}$/.test(val), {
      message: "Número de telefone inválido",
    }),
  birth: z
    .string()
    .nonempty("Informe sua data de nascimento")
    .refine((date) => {
      const day = parseInt(date.slice(0, 2), 10);
      const month = parseInt(date.slice(2, 4), 10) - 1;
      const year = parseInt(date.slice(4, 8), 10);

      const parsed = new Date(year, month, day);

      const isValidDate = parsed.getFullYear() === year && parsed.getMonth() === month && parsed.getDate() === day;

      const isPast = parsed < new Date();

      return isValidDate && isPast;
    }, "Sua data de nascimento deve estar no passado e ser válida")
    .transform((date) => {
      const day = date.slice(0, 2);
      const month = date.slice(2, 4);
      const year = date.slice(4, 8);
      return `${year}-${day}-${month}`;
    }),
});

export const profilePictureSchema = z.object({
  file: z
    .instanceof(File, { message: "Informe uma imagem para seu perfil" })
    .refine((file) => acceptMimetypes.includes(file.type), {
      message: "A imagem de perfil não está em um formato válido",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "A imagem de perfil deve ter no máximo 5MB",
    }),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("Informe sua senha")
      .min(6, "Sua senha tem que ser maior do que 6 caracteres")
      .max(20, "Sua senha tem que ser menor do que 20 caracteres")
      .regex(/.*[A-Z].*/, "Sua senha deve ter uma letra maiúscula")
      .regex(/.*\d.*\d.*/, "Sua senha deve ter dois números")
      .regex(/.*[@$!%*?&.#].*/, "Sua senha deve ter um caractere especial"),
    newPassword: z
      .string()
      .nonempty("Informe sua nova senha")
      .min(6, "Sua nova senha tem que ser maior do que 6 caracteres")
      .max(20, "Sua nova senha tem que ser menor do que 20 caracteres")
      .regex(/.*[A-Z].*/, "Sua senha deve ter uma letra maiúscula")
      .regex(/.*\d.*\d.*/, "Sua senha deve ter dois números")
      .regex(/.*[@$!%*?&.#].*/, "Sua senha deve ter um caractere especial"),
    confirmPassword: z
      .string()
      .nonempty("Confirme sua nova senha")
      .min(6, "Sua nova senha tem que ser maior do que 6 caracteres")
      .max(20, "Sua nova senha tem que ser menor do que 20 caracteres")
      .regex(/.*[A-Z].*/, "Sua senha deve ter uma letra maiúscula")
      .regex(/.*\d.*\d.*/, "Sua senha deve ter dois números")
      .regex(/.*[@$!%*?&.#].*/, "Sua senha deve ter um caractere especial"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type UpdateAccountRequestDTO = z.infer<typeof updateAccountSchema>;
export type ProfilePictureRequestDTO = z.infer<typeof profilePictureSchema>;
export type updatePasswordRequestDTO = z.infer<typeof updatePasswordSchema>;
