import type { CommentDTO, CommentQueryParams } from "@/types/commentTypes";
import type { DefaultDTO, PageResponseDTO } from "@/types/default";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { axios } from "@/api/axios";
import type { CommentRequestDTO } from "@/schemas/commentSchema";

const createComment = async (data: CommentRequestDTO): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post("/comments", data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findAllComments = async (params: CommentQueryParams): Promise<DefaultDTO<PageResponseDTO<CommentDTO>>> => {
  try {
    const response = await axios.get(`/comments/${params.productId}`, {
      params: { ...params },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const commentService = {
  createComment,
  findAllComments,
};
