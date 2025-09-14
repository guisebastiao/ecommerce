import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().nonempty("Informe a rua").max(100, "A rua tem que possuir menos de 100 caracteres"),

  number: z.string().nonempty("Informe o número").max(20, "O número deve ter no máximo 20 caracteres"),

  complement: z.string().max(100, "O complemento deve ter no máximo 100 caracteres").optional(),

  neighborhood: z.string().nonempty("Informe o bairro").max(100, "O bairro deve ter no máximo 100 caracteres"),

  city: z.string().nonempty("Informe a cidade").max(60, "A cidade deve ter no máximo 100 caracteres"),

  state: z.string().nonempty("Informe a estado").max(100, "O estado deve ter no máximo 100 caracteres"),

  zip: z
    .string()
    .nonempty("Informe o CEP")
    .regex(/^\d{5}-?\d{3}$/, "CEP inválido"),

  country: z.string().nonempty("Informe o país").max(100, "O país deve ter no máximo 100 caracteres"),
});

export type AddressRequestDTO = z.infer<typeof addressSchema>;
