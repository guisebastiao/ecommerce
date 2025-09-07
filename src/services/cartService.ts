import type { CartItemDTO, CartQueryParams } from "@/types/cartTypes";
import type { FavoriteRequestDTO } from "@/schemas/favoriteSchema";
import type { DefaultDTO, PageResponseDTO } from "@/types/default";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { axios } from "@/api/axios";
import type { UpdateCartRequestDTO } from "@/schemas/cartSchema";

const addProductToCart = async (data: FavoriteRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post("/cart", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findAllCartItems = async (params: CartQueryParams): Promise<DefaultDTO<PageResponseDTO<CartItemDTO>>> => {
  try {
    const response = await axios.get("/cart", {
      params: { ...params },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const updateQuantity = async ({ data, cartItemId }: { cartItemId: string; data: UpdateCartRequestDTO }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.put(`/cart/${cartItemId}`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const removeCartItem = async ({ cartItemId }: { cartItemId: string }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.delete(`/cart/${cartItemId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const cartService = {
  addProductToCart,
  findAllCartItems,
  updateQuantity,
  removeCartItem,
};
