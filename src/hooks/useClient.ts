import type { ProfilePictureRequestDTO, UpdateAccountRequestDTO, updatePasswordRequestDTO } from "@/schemas/clientSchema";
import { clientService } from "@/services/clientService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const updateAccount = () => {
  return useMutation({
    mutationFn: (data: UpdateAccountRequestDTO) => clientService.updateAccount(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const updatePassword = () => {
  return useMutation({
    mutationFn: (data: updatePasswordRequestDTO) => clientService.updatePassword(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const uploadProfilePicture = () => {
  return useMutation({
    mutationFn: (data: ProfilePictureRequestDTO) => clientService.uploadProfilePicture(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const deleteProfilePicture = () => {
  return useMutation({
    mutationFn: () => clientService.deleteProfilePicture(),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};
