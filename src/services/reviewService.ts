import type { ReviewRequestDTO } from "@/schemas/reviewSchema";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { DefaultDTO } from "@/types/default";
import { axios } from "@/api/axios";

const createReview = async ({ productId, data }: { productId: string; data: ReviewRequestDTO }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post(`/reviews/${productId}`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const deleteReview = async ({ productId }: { productId: string }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.delete(`/reviews/${productId}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const reviewService = {
  createReview,
  deleteReview,
};
