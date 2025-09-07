import type { ActiveLoginRequestDTO, ActiveRegisterRequestDTO, LoginRequestDTO, RegisterRequestDTO } from "@/schemas/authSchema";
import type { ActiveLoginDTO, LoginDTO } from "@/types/authTypes";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { DefaultDTO } from "@/types/default";
import { axios } from "@/api/axios";

const login = async (data: LoginRequestDTO): Promise<DefaultDTO<LoginDTO>> => {
  try {
    const response = await axios.post("/auth/login", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const activeLogin = async (data: ActiveLoginRequestDTO): Promise<DefaultDTO<ActiveLoginDTO>> => {
  try {
    const response = await axios.post("auth/active-login", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const register = async (data: RegisterRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post("auth/register", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const activeRegister = async (data: ActiveRegisterRequestDTO): Promise<DefaultDTO<ActiveLoginDTO>> => {
  try {
    const response = await axios.post("auth/active-account", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const logout = async (): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post("auth/logout");
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const authService = {
  login,
  activeLogin,
  register,
  activeRegister,
  logout,
};
