import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Informe seu email").email("Email inválido").max(250, "Seu email tem que ser menor do que 250 caracteres"),
  password: z
    .string()
    .min(1, "Informe sua senha")
    .min(6, "Sua senha tem que ser maior do que 6 caracteres")
    .max(20, "Sua senha tem que ser menor do que 20 caracteres")
    .regex(/.*[A-Z].*/, "Sua senha deve ter uma letra maiúscula")
    .regex(/.*\d.*\d.*/, "Sua senha deve ter dois números")
    .regex(/.*[@$!%*?&.#].*/, "Sua senha deve ter um caractere especial"),
});

export const registerSchema = z
  .object({
    name: z.string().trim().nonempty("Informe seu nome").min(3, "Seu nome tem que ser maior do que 3 caracteres").max(100, "Seu nome tem que ser menor de 100 caracteres"),
    surname: z.string().trim().nonempty("Informe seu sonbrenome").min(3, "Seu sobrenome tem que ser maior do que 3 caracteres").max(100, "Seu sobrenome tem que ser menor de 100 caracteres"),
    email: z.string().trim().nonempty("Informe seu email").email("Email inválido").max(250, "Seu email tem que ser menor do que 250 caracteres"),
    password: z
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
    cpf: z
      .string()
      .nonempty("Informe seu CPF")
      .regex(/^\d{11}$/, "Seu CPF está inválido"),
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const activeLoginSchema = z.object({
  code: z.string().trim().min(1, "Informe o código"),
  verificationCode: z.string().trim().min(1, "Informe o código de verificação").regex(/\d{6}/, "Sua senha deve ter uma letra maiúscula"),
});

export const activeRegisterSchema = z.object({
  verificationCode: z.string().trim().min(1, "Informe o código de verificação"),
});

export type LoginRequestDTO = z.infer<typeof loginSchema>;
export type RegisterRequestDTO = z.infer<typeof registerSchema>;
export type ActiveLoginRequestDTO = z.infer<typeof activeLoginSchema>;
export type ActiveRegisterRequestDTO = z.infer<typeof activeRegisterSchema>;
