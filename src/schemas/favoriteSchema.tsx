import { z } from "zod";

export const favoriteSchema = z.object({
  productId: z.string().trim().nonempty("Informe o ID do produto"),
});

export type FavoriteRequestDTO = z.infer<typeof favoriteSchema>;
