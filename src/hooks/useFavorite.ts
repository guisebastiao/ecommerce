import type { FavoriteRequestDTO } from "@/schemas/favoriteSchema";
import type { ProductQueryParams } from "@/types/productTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { favoriteService } from "@/services/favoriteService";
import { queryClient } from "@/context/queryContext";
import { toast } from "sonner";

export const addFavorite = () => {
  return useMutation({
    mutationFn: (data: FavoriteRequestDTO) => favoriteService.addFavorite(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["find-product-by-id"] });
      queryClient.invalidateQueries({ queryKey: ["find-all-favorites"] });
      queryClient.invalidateQueries({ queryKey: ["find-all-products"] });
    },
  });
};

export const findAllFavorites = (params: ProductQueryParams) => {
  const { offset = "1", limit = "20" } = params;

  return useQuery({
    queryKey: ["find-all-favorites", offset, limit],
    queryFn: () => favoriteService.findAllFavorites({ offset, limit }),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const removeFavorite = () => {
  return useMutation({
    mutationFn: ({ productId }: { productId: string }) => favoriteService.removeFavorite({ productId }),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["find-product-by-id"] });
      queryClient.invalidateQueries({ queryKey: ["find-all-favorites"] });
      queryClient.invalidateQueries({ queryKey: ["find-all-products"] });
    },
  });
};
