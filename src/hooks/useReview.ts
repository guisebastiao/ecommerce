import type { ReviewRequestDTO } from "@/schemas/reviewSchema";
import { reviewService } from "@/services/reviewService";
import { queryClient } from "@/context/queryContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const createReview = () => {
  return useMutation({
    mutationFn: (data: { productId: string; data: ReviewRequestDTO }) => reviewService.createReview(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-product-by-id"] });
      toast.success(data.message);
    },
  });
};

export const deleteReview = () => {
  return useMutation({
    mutationFn: (data: { productId: string }) => reviewService.deleteReview(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-product-by-id"] });
      toast.success(data.message);
    },
  });
};
