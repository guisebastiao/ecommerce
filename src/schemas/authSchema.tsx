import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Informe seu email")
    .email("Email inválido")
    .max(250, "Seu email tem que ser menor do que 250 caracteres"),
  password: z
    .string()
    .min(1, "Informe sua senha")
    .min(6, "Sua senha tem que ser maior do que 6 caracteres")
    .max(20, "Sua senha tem que ser menor do que 20 caracteres")
    .regex(/.*[A-Z].*/, "Sua senha deve ter uma letra maiúscula")
    .regex(/.*\d.*\d.*/, "Sua senha deve ter dois números")
    .regex(/.*[@$!%*?&.#].*/, "Sua senha deve ter um caractere especial"),
});

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Seu nome tem que ser maior do que 3 caracteres")
      .max(100, "Seu nome tem que ser menor de 100 caracteres"),
    surname: z
      .string()
      .trim()
      .min(3, "Seu sobrenome tem que ser maior do que 3 caracteres")
      .max(100, "Seu sobrenome tem que ser menor de 100 caracteres"),
    email: z
      .string()
      .trim()
      .min(1, "Informe seu email")
      .email("Email inválido")
      .max(250, "Seu email tem que ser menor do que 250 caracteres"),
    password: z
      .string()
      .min(6, "Sua senha tem que ser maior do que 6 caracteres")
      .max(20, "Sua senha tem que ser menor do que 20 caracteres")
      .regex(/.*[A-Z].*/, "Sua senha deve ter uma letra maiúscula")
      .regex(/.*\d.*\d.*/, "Sua senha deve ter dois números")
      .regex(/.*[@$!%*?&.#].*/, "Sua senha deve ter um caractere especial"),
    confirmPassword: z
      .string()
      .min(6, "Sua senha tem que ser maior do que 6 caracteres")
      .max(20, "Sua senha tem que ser menor do que 20 caracteres")
      .regex(/.*[A-Z].*/, "Sua senha deve ter uma letra maiúscula")
      .regex(/.*\d.*\d.*/, "Sua senha deve ter dois números")
      .regex(/.*[@$!%*?&.#].*/, "Sua senha deve ter um caractere especial"),
    cpf: z
      .string()
      .min(1, "Informe seu CPF")
      .regex(/^\d{11}$/, "Seu CPF está inválido"),
    phone: z
      .string()
      .min(1, "Informe seu número de telefone")
      .regex(/^\d{13}$/, "Número de telefone inválido"),
    birth: z.string().refine((date) => {
      const parsed = new Date(date);
      return !isNaN(parsed.getTime()) && parsed < new Date();
    }, "Sua data de nascimento deve estar no passado"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type LoginFormDTO = z.infer<typeof loginFormSchema>;
export type RegisterFormDTO = z.infer<typeof registerFormSchema>;
