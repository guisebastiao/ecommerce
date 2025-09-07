import { z } from "zod";

export const cartSchema = z.object({
  productId: z.string().trim().nonempty("Informe o ID do produto"),
  quantity: z.number().min(1, "A quantidade miníma é de um produto"),
});

export const updateCartSchema = z.object({
  quantity: z.number().min(1, "A quantidade miníma é de um produto"),
});

export type CartRequestDTO = z.infer<typeof cartSchema>;
export type UpdateCartRequestDTO = z.infer<typeof updateCartSchema>;
