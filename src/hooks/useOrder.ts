import type { ConfirmPaymentRequestDTO, CreateOrderRequestDTO } from "@/schemas/orderSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { OrderQueryParams } from "@/types/orderTypes";
import { orderService } from "@/services/orderService";
import { queryClient } from "@/context/queryContext";
import { toast } from "sonner";

export const createPayment = () => {
  return useMutation({
    mutationFn: (data: CreateOrderRequestDTO) => orderService.createPayment(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const findAllOrders = (params: OrderQueryParams) => {
  const { offset = "1", limit = "20" } = params;

  return useQuery({
    queryKey: ["find-all-orders", offset, limit],
    queryFn: () => orderService.findAllOrders({ offset, limit }),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const confirmPayment = () => {
  return useMutation({
    mutationFn: (data: ConfirmPaymentRequestDTO) => orderService.confirmPayment(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["find-all-cart-items"] });
    },
  });
};

export const cancelOrder = () => {
  return useMutation({
    mutationFn: (data: { orderId: string }) => orderService.cancelOrder(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["find-all-orders"] });
    },
  });
};
