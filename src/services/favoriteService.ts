import type { FavoriteRequestDTO } from "@/schemas/favoriteSchema";
import type { DefaultDTO, PageResponseDTO } from "@/types/default";
import type { FavoriteQueryParams } from "@/types/favoriteTypes";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { ProductDTO } from "@/types/productTypes";
import { axios } from "@/api/axios";

const addFavorite = async (data: FavoriteRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post("/favorites", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findAllFavorites = async (params: FavoriteQueryParams): Promise<DefaultDTO<PageResponseDTO<ProductDTO>>> => {
  try {
    const response = await axios.get("/favorites", {
      params: { ...params },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const removeFavorite = async ({ productId }: { productId: string }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.delete(`/favorites/${productId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const favoriteService = {
  addFavorite,
  findAllFavorites,
  removeFavorite,
};
