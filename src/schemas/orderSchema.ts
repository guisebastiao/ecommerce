import { z } from "zod";

export const createOrderSchema = z.object({
  paymentMethod: z.string().trim().nonempty("Informe o tipo de pagamento"),
});

export const confirmPaymentSchema = z.object({
  stripePaymentId: z.string().trim().nonempty("Informe o ID do Payment Intent"),
  orderId: z.string().trim().nonempty("Informe o ID do pedido"),
});

export type CreateOrderRequestDTO = z.infer<typeof createOrderSchema>;
export type ConfirmPaymentRequestDTO = z.infer<typeof confirmPaymentSchema>;
