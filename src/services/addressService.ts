import type { DefaultDTO, PageResponseDTO } from "@/types/default";
import type { AddressRequestDTO } from "@/schemas/addressSchema";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { AddressDTO } from "@/types/addressTypes";
import { axios } from "@/api/axios";

const createAddress = async (data: AddressRequestDTO): Promise<DefaultDTO<PageResponseDTO<null>>> => {
  try {
    const response = await axios.post("/addresses", data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findAllAddresses = async (): Promise<DefaultDTO<AddressDTO[]>> => {
  try {
    const response = await axios.get("/addresses");

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const updateAddress = async ({ addressId, data }: { addressId: string; data: AddressRequestDTO }): Promise<DefaultDTO<PageResponseDTO<null>>> => {
  try {
    const response = await axios.put(`/addresses/${addressId}`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const deleteAddress = async ({ addressId }: { addressId: string }): Promise<DefaultDTO<PageResponseDTO<null>>> => {
  try {
    const response = await axios.delete(`/addresses/${addressId}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const addressService = {
  createAddress,
  findAllAddresses,
  updateAddress,
  deleteAddress,
};
