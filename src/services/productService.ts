import type { ProductDTO, ProductQueryParams } from "@/types/productTypes";
import type { DefaultDTO, PageResponseDTO } from "@/types/default";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { axios } from "@/api/axios";

const findAllProducts = async (params: ProductQueryParams): Promise<DefaultDTO<PageResponseDTO<ProductDTO>>> => {
  try {
    const response = await axios.get("/products", {
      params: { ...params },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findProductById = async ({ productId }: { productId: string }): Promise<DefaultDTO<ProductDTO>> => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const productService = {
  findAllProducts,
  findProductById,
};
