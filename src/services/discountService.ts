import type { DiscountRequestDTO } from "@/schemas/discountSchema";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { DiscountDTO } from "@/types/discountTypes";
import type { DefaultDTO } from "@/types/default";
import { axios } from "@/api/axios";

const createDiscount = async (data: DiscountRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post("/discounts", data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findAllDiscounts = async (): Promise<DefaultDTO<DiscountDTO[]>> => {
  try {
    const response = await axios.get("/discounts");

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const updateDiscount = async ({ discountId, data }: { discountId: string; data: DiscountRequestDTO }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.put(`/discounts/${discountId}`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const deleteDiscount = async ({ discountId }: { discountId: string }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.delete(`/discounts/${discountId}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const discountService = {
  createDiscount,
  findAllDiscounts,
  updateDiscount,
  deleteDiscount,
};
