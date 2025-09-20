import { acceptMimetypes } from "@/utils/acceptMimetypes";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = acceptMimetypes;

const fileSchema = z
  .instanceof(File)
  .refine((f) => f.size <= MAX_FILE_SIZE, {
    message: "A imagem do produto deve ter no máximo 5MB",
  })
  .refine((f) => ALLOWED_TYPES.includes(f.type), {
    message: "Arquivo não permitido",
  });

export const createProductSchema = z.object({
  name: z.string().min(1, { message: "Informe o nome do produto" }).max(250, { message: "O nome deve ter no máximo 250 caracteres" }),
  description: z.string().min(1, { message: "Informe a descrição do produto" }),
  price: z.string().nonempty({ message: "Informe o preço do produto" }),
  stock: z.string().nonempty({ message: "Informe o estoque do produto" }),
  categoryId: z.string().nonempty({ message: "Informe o estoque do produto" }),
  files: z.array(fileSchema).min(1, "Pelo menos uma imagem o produto deve possuir").max(20, "São permitidos até 20 imagens por produto"),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, { message: "Informe o nome do produto" }).max(250, { message: "O nome deve ter no máximo 250 caracteres" }),
  description: z.string().min(1, { message: "Informe a descrição do produto" }),
  price: z.string().nonempty({ message: "Informe o preço do produto" }),
  stock: z.string().nonempty({ message: "Informe o estoque do produto" }),
  categoryId: z.string().nonempty({ message: "Informe o estoque do produto" }),
});

export type CreateProductRequestDTO = z.infer<typeof createProductSchema>;
export type UpdateProductRequestDTO = z.infer<typeof updateProductSchema>;
