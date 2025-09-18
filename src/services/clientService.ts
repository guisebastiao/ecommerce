import type { ProfilePictureRequestDTO, UpdateAccountRequestDTO, updatePasswordRequestDTO } from "@/schemas/clientSchema";
import type { ClientPictureDTO, ClientSimpleDTO } from "@/types/clientTypes";
import { handleAxiosError } from "@/utils/handleAxiosError";
import type { DefaultDTO } from "@/types/default";
import { axios } from "@/api/axios";

const updateAccount = async (data: UpdateAccountRequestDTO): Promise<DefaultDTO<ClientSimpleDTO>> => {
  try {
    const response = await axios.put(`/clients`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const updatePassword = async (data: updatePasswordRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.put(`/clients/update-password`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const uploadProfilePicture = async (data: ProfilePictureRequestDTO): Promise<DefaultDTO<ClientPictureDTO>> => {
  try {
    const response = await axios.post(`/client-picture`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const deleteProfilePicture = async (): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.delete(`/client-picture`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const clientService = {
  updateAccount,
  updatePassword,
  uploadProfilePicture,
  deleteProfilePicture,
};
