import type { ApplyDiscountRequestDTO, CreateProductRequestDTO, UpdateProductRequestDTO } from "@/schemas/productSchema";
import type { ProductQueryParams } from "@/types/productTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { queryClient } from "@/context/queryContext";
import { toast } from "sonner";

export const createProduct = () => {
  return useMutation({
    mutationFn: (data: CreateProductRequestDTO) => productService.createProduct(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-products"] });
      toast.success(data.message);
    },
  });
};

export const applyDiscount = () => {
  return useMutation({
    mutationFn: (data: ApplyDiscountRequestDTO) => productService.applyDiscount(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-products"] });
      toast.success(data.message);
    },
  });
};

export const findAllProducts = (params: ProductQueryParams) => {
  const { search = "", category = "", offset = "1", limit = "20" } = params;

  return useQuery({
    queryKey: ["find-all-products", search, category, offset, limit],
    queryFn: () => productService.findAllProducts({ search, category, offset, limit }),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const findProductById = ({ productId }: { productId: string }) => {
  return useQuery({
    queryKey: ["find-product-by-id", productId],
    queryFn: () => productService.findProductById({ productId }),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const updateProduct = () => {
  return useMutation({
    mutationFn: (data: { productId: string; data: UpdateProductRequestDTO }) => productService.updateProduct(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-products"] });
      toast.success(data.message);
    },
  });
};

export const deleteProduct = () => {
  return useMutation({
    mutationFn: (data: { productId: string }) => productService.deleteProduct(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-products"] });
      toast.success(data.message);
    },
  });
};

export const removeDiscount = () => {
  return useMutation({
    mutationFn: (data: { productId: string }) => productService.removeDiscount(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-products"] });
      toast.success(data.message);
    },
  });
};
