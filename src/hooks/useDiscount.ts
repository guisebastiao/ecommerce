import type { DiscountRequestDTO } from "@/schemas/discountSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { discountService } from "@/services/discountService";
import { queryClient } from "@/context/queryContext";
import { toast } from "sonner";
import type { DiscountQueryParams } from "@/types/discountTypes";

export const createDiscount = () => {
  return useMutation({
    mutationFn: (data: DiscountRequestDTO) => discountService.createDiscount(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-discounts"] });
      toast.success(data.message);
    },
  });
};

export const findAllDiscounts = () => {
  return useQuery({
    queryKey: ["find-all-discounts"],
    queryFn: () => discountService.findAllDiscounts(),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const updateDiscount = () => {
  return useMutation({
    mutationFn: (data: { discountId: string; data: DiscountRequestDTO }) => discountService.updateDiscount(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-discounts"] });
      toast.success(data.message);
    },
  });
};

export const deleteDiscount = () => {
  return useMutation({
    mutationFn: (data: { discountId: string }) => discountService.deleteDiscount(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-discounts"] });
      toast.success(data.message);
    },
  });
};
