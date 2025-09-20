import type { CategoryRequestDTO } from "@/schemas/categorySchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";
import { queryClient } from "@/context/queryContext";
import { toast } from "sonner";

export const createCategory = () => {
  return useMutation({
    mutationFn: (data: CategoryRequestDTO) => categoryService.createCategoty(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-categories"] });
      toast.success(data.message);
    },
  });
};

export const findAllCategories = () => {
  return useQuery({
    queryKey: ["find-all-categories"],
    queryFn: () => categoryService.findAllCategories(),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const updateCategory = () => {
  return useMutation({
    mutationFn: (data: { categoryId: string; data: CategoryRequestDTO }) => categoryService.updateCategory(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-categories"] });
      toast.success(data.message);
    },
  });
};

export const deleteCategory = () => {
  return useMutation({
    mutationFn: (data: { categoryId: string }) => categoryService.deleteCategory(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-categories"] });
      toast.success(data.message);
    },
  });
};
