import type { FavoriteRequestDTO } from "@/schemas/favoriteSchema";
import type { UpdateCartRequestDTO } from "@/schemas/cartSchema";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { DefaultDTO } from "@/types/default";
import type { CartDTO } from "@/types/cartTypes";
import { axios } from "@/api/axios";

const addProductToCart = async (data: FavoriteRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post("/cart", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findAllCartItems = async (): Promise<DefaultDTO<CartDTO>> => {
  try {
    const response = await axios.get("/cart");

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
