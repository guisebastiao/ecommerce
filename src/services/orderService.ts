import type { ConfirmPaymentRequestDTO, CreateOrderRequestDTO } from "@/schemas/orderSchema";
import type { OrderDTO, OrderQueryParams, PaymentDTO } from "@/types/orderTypes";
import type { DefaultDTO, PageResponseDTO } from "@/types/default";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { axios } from "@/api/axios";

const createPayment = async (data: CreateOrderRequestDTO): Promise<DefaultDTO<PaymentDTO>> => {
  try {
    const response = await axios.post("/orders/create-payment", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findAllOrders = async (params: OrderQueryParams): Promise<DefaultDTO<PageResponseDTO<OrderDTO>>> => {
  try {
    const response = await axios.get("/orders", {
      params: {
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const confirmPayment = async (data: ConfirmPaymentRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post(`/orders/${data.orderId}/payment`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const orderService = {
  createPayment,
  findAllOrders,
  confirmPayment,
};
