import type { CartRequestDTO, UpdateCartRequestDTO } from "@/schemas/cartSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { cartService } from "@/services/cartService";
import { queryClient } from "@/context/queryContext";
import { toast } from "sonner";

export const addProductToCart = () => {
  return useMutation({
    mutationFn: (data: CartRequestDTO) => cartService.addProductToCart(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["find-all-cart-items"] });
    },
  });
};

export const findAllCartItems = () => {
  return useQuery({
    queryKey: ["find-all-cart-items"],
    queryFn: () => cartService.findAllCartItems(),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const updateQuantity = () => {
  return useMutation({
    mutationFn: (data: { cartItemId: string; data: UpdateCartRequestDTO }) => cartService.updateQuantity(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["find-all-cart-items"] });
    },
  });
};

export const removeCartItem = () => {
  return useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: string }) => cartService.removeCartItem({ cartItemId }),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["find-all-cart-items"] });
    },
  });
};
