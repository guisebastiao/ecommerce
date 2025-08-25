import type { ProductQueryParams } from "@/types/productTypes";
import { productService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const findAllProducts = (params: ProductQueryParams) => {
  const { search = "", category = "", offset = "0", limit = "20" } = params;

  return useQuery({
    queryKey: ["find-all-products", search, category, offset, limit],
    queryFn: () =>
      productService.findAllProducts({ search, category, offset, limit }),
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
