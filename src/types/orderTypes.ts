import type { ProductDTO } from "./productTypes";

export interface OrderQueryParams {
  offset: string;
  limit: string;
}

export enum OrderStatus {
  PENDING = "PENDING",
  PENDING_PAYMENT = "PENDING_PAYMENT",
  PAID = "PAID",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
  FAILED = "FAILED",
}

export enum PaymentMethod {
  CARD = "CARD",
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
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  items: OrderItemDTO[];
}
