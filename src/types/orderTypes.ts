import type { ProductDTO } from "./productTypes";

export interface OrderQueryParams {
  offset: string;
  limit: string;
}

export enum OrderStatus {
  PENDING = "Pendente",
  PENDING_PAYMENT = "Aguardando Pagamento",
  PAID = "Pago",
  SHIPPED = "Enviado",
  DELIVERED = "Entregue",
  CANCELED = "Cancelado",
  FAILED = "Falha",
}

export enum PaymentMethod {
  CARD = "Cartão de Crédito",
}

export interface PaymentDTO {
  clientSecret: string;
  paymentIntentId: string;
  orderId: string;
}

export interface OrderItemDTO {
  orderItemId: string;
  quantity: number;
  product: ProductDTO;
}

export interface OrderDTO {
  orderId: string;
  orderNumber: string;
  orderStatus: keyof typeof OrderStatus;
  paymentMethod: keyof typeof PaymentMethod;
  total: number;
  items: OrderItemDTO[];
}
