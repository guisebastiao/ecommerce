import { z } from "zod";

export const searchFormSchema = z.object({
  search: z.string().trim(),
});

export type SearchFormDTO = z.infer<typeof searchFormSchema>;
