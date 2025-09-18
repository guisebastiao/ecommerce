import type { CommentDTO, CommentQueryParams } from "@/types/commentTypes";
import type { DefaultDTO, PageResponseDTO } from "@/types/default";
import type { CommentRequestDTO } from "@/schemas/commentSchema";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { axios } from "@/api/axios";

const createComment = async ({ productId, data }: { productId: string; data: CommentRequestDTO }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.post(`/comments/${productId}`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const findAllComments = async ({ productId, params }: { productId: string; params: CommentQueryParams }): Promise<DefaultDTO<PageResponseDTO<CommentDTO>>> => {
  try {
    const response = await axios.get(`/comments/${productId}`, {
      params: { ...params },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const updateComment = async ({ commentId, data }: { commentId: string; data: CommentRequestDTO }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.put(`/comments/${commentId}`, data);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const deleteComment = async ({ commentId }: { commentId: string }): Promise<DefaultDTO<null>> => {
  try {
    const response = await axios.delete(`/comments/${commentId}`);

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const commentService = {
  createComment,
  findAllComments,
  updateComment,
  deleteComment,
};
