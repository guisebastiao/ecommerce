import z from "zod";

export const discountSchema = z.object({
  name: z.string().min(1, "Informe o nome da promoção").max(250, "O nome da promoção tem que ser menor de 250 caracteres"),
  percent: z.string().min(0.01, "O percentual mínimo é 0.01").max(100.0, "O percentual máximo é 100.0"),
  endDate: z
    .string()
    .nonempty("Informe o dia do fim da promoção")
    .refine((val) => {
      if (!val) return false;
      const today = new Date();
      const selected = new Date(val);
      return selected > today;
    }, "A data tem que estar no futuro"),
});

export type DiscountRequestDTO = z.infer<typeof discountSchema>;
