import type { DefaultDTO, PageResponseDTO } from "@/types/default";
import type { CategoryRequestDTO } from "@/schemas/categorySchema";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { CategoryDTO } from "@/types/categoryTypes";
import { axios } from "@/api/axios";

const createCategoty = async (data: CategoryRequestDTO): Promise<DefaultDTO<PageResponseDTO<null>>> => {
  try {
    const response = await axios.post("/categories", data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findAllCategories = async (): Promise<DefaultDTO<CategoryDTO[]>> => {
  try {
    const response = await axios.get("/categories");

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const updateCategory = async ({ categoryId, data }: { categoryId: string; data: CategoryRequestDTO }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.put(`/categories/${categoryId}`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const deleteCategory = async ({ categoryId }: { categoryId: string }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.delete(`/categories/${categoryId}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const categoryService = {
  createCategoty,
  findAllCategories,
  updateCategory,
  deleteCategory,
};
