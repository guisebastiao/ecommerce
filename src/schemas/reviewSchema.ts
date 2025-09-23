import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().max(5, "A avaliação deve ser no máximo 5 estrelas").min(1, "A avaliação deve ser no mínimo 1 estrela"),
});

export type ReviewRequestDTO = z.infer<typeof reviewSchema>;
