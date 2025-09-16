import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().nonempty("Informe o comentário").max(300, "O comentário pode ter no máximo 300 caracteres"),
});

export type CommentRequestDTO = z.infer<typeof commentSchema>;
