import type { DefaultDTO } from "@/types/default";
import { AxiosError } from "axios";

export function handleAxiosError(error: unknown): never {
  if (error instanceof AxiosError) {
    if (!error.response) {
      throw new Error(
        "Não foi possível conectar ao servidor. Tente novamente mais tarde."
      );
    }

    const data = error.response.data as DefaultDTO<null>;
    throw new Error(data?.message ?? "Ocorreu um erro inesperado.");
  }

  throw new Error("Algo deu errado, tente novamente mais tarde.");
}
