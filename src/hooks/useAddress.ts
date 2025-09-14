import type { AddressRequestDTO } from "@/schemas/addressSchema";
import type { AddressQueryParams } from "@/types/addressTypes";
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

export const findAllAddresses = (params: AddressQueryParams) => {
  const { offset = "1", limit = "20" } = params;

  return useQuery({
    queryKey: ["find-all-addresses", offset, limit],
    queryFn: () => addressService.findAllAddresses({ offset, limit }),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};
