import type { ProductDTO } from "./productTypes";

export interface CartItemDTO {
  cartItemId: string;
  quantity: number;
  product: ProductDTO;
}

export interface CartDTO {
  cartItems: CartItemDTO[];
  total: number;
  subtotal: number;
  totalDiscounts: number;
}
