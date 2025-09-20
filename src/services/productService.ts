import type { CreateProductRequestDTO, UpdateProductRequestDTO } from "@/schemas/productSchema";
import type { ProductDTO, ProductQueryParams } from "@/types/productTypes";
import type { DefaultDTO, PageResponseDTO } from "@/types/default";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { axios } from "@/api/axios";

const createProduct = async (data: CreateProductRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("categoryId", data.categoryId);

    data.files.forEach((file) => formData.append("files", file, file.name));

    const response = await axios.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

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

const updateProduct = async ({ productId, data }: { productId: string; data: UpdateProductRequestDTO }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.put(`/products/${productId}`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const deleteProduct = async ({ productId }: { productId: string }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.delete(`/products/${productId}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const productService = {
  createProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
