import type { ForgotPasswordRequestDTO, ResetPasswordRequestDTO } from "@/schemas/recoverPasswordSchema";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { DefaultDTO } from "@/types/default";
import { axios } from "@/api/axios";

const forgotPassword = async (data: ForgotPasswordRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post("/recover-password", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const resetPassword = async ({ code, data }: { code: string; data: ResetPasswordRequestDTO }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.put(`/recover-password/${code}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const recoverPasswordService = {
  forgotPassword,
  resetPassword,
};
