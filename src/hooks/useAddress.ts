import type { AddressRequestDTO } from "@/schemas/addressSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addressService } from "@/services/addressService";
import { queryClient } from "@/context/queryContext";
import { toast } from "sonner";

export const createAddress = () => {
  return useMutation({
    mutationFn: (data: AddressRequestDTO) => addressService.createAddress(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-addresses"] });
      toast.success(data.message);
    },
  });
};

export const findAllAddresses = () => {
  return useQuery({
    queryKey: ["find-all-addresses"],
    queryFn: () => addressService.findAllAddresses(),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const updateAddress = () => {
  return useMutation({
    mutationFn: (data: { addressId: string; data: AddressRequestDTO }) => addressService.updateAddress(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-addresses"] });
      toast.success(data.message);
    },
  });
};

export const deleteAddress = () => {
  return useMutation({
    mutationFn: (data: { addressId: string }) => addressService.deleteAddress(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-addresses"] });
      toast.success(data.message);
    },
  });
};
