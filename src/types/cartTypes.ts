import type { ProductDTO } from "./productTypes";

export interface CartQueryParams {
  offset: string;
  limit: string;
}

export interface CartItemDTO {
  cartItemId: string;
  quantity: number;
  product: ProductDTO;
}
