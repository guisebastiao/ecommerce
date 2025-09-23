import z from "zod";

export const categorySchema = z.object({
  name: z.string().nonempty("Informe o nome da categoria").max(50, "A categoria tem que ser menor de 50 caracteres"),
});

export type CategoryRequestDTO = z.infer<typeof categorySchema>;
