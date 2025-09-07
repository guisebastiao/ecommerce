import type { ActiveLoginDTO } from "@/types/authTypes";
import type { DefaultDTO } from "@/types/default";
import axiosInstance from "axios";

const axios = axiosInstance.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosRaw = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(async (config) => {
  const storage = localStorage.getItem("auth");

  if (!storage || storage === "null") return config;

  const { expiresAccessToken, expiresRefreshToken } = JSON.parse(storage) as ActiveLoginDTO;

  const now = new Date();
  const expiresToken = new Date(expiresAccessToken);
  const expiresRefresh = new Date(expiresRefreshToken);

  if (expiresRefresh <= now) {
    localStorage.removeItem("auth");
    return config;
  }

  if (expiresToken <= now) {
    try {
      const { data, status } = await axiosRaw.post<DefaultDTO<ActiveLoginDTO>>("/auth/refresh-token");

      if (status === 200 && data?.data) {
        localStorage.setItem("auth", JSON.stringify(data.data));
      } else {
        localStorage.removeItem("auth");
      }
    } catch (error) {
      localStorage.removeItem("auth");
      return Promise.reject(error);
    }
  }

  return config;
});

export { axios };
