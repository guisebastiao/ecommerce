import type { ForgotPasswordRequestDTO, ResetPasswordRequestDTO } from "@/schemas/recoverPasswordSchema";
import { recoverPasswordService } from "@/services/recoverPasswordService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const forgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequestDTO) => recoverPasswordService.forgotPassword(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const resetPassword = () => {
  return useMutation({
    mutationFn: ({ code, data }: { code: string; data: ResetPasswordRequestDTO }) => recoverPasswordService.resetPassword({ code, data }),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};
