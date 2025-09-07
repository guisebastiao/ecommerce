import type { ActiveLoginRequestDTO, ActiveRegisterRequestDTO, LoginRequestDTO, RegisterRequestDTO } from "@/schemas/authSchema";
import { authService } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const login = () => {
  return useMutation({
    mutationFn: (data: LoginRequestDTO) => authService.login(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const activeLogin = () => {
  return useMutation({
    mutationFn: (data: ActiveLoginRequestDTO) => authService.activeLogin(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const register = () => {
  return useMutation({
    mutationFn: (data: RegisterRequestDTO) => authService.register(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const activeRegister = () => {
  return useMutation({
    mutationFn: (data: ActiveRegisterRequestDTO) => authService.activeRegister(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};

export const logout = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });
};
