import type { CommentRequestDTO } from "@/schemas/commentSchema";
import type { CommentQueryParams } from "@/types/commentTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { commentService } from "@/services/commentService";
import { queryClient } from "@/context/queryContext";
import { toast } from "sonner";

export const createComment = () => {
  return useMutation({
    mutationFn: (data: { productId: string; data: CommentRequestDTO }) => commentService.createComment(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-comments"] });
      toast.success(data.message);
    },
  });
};

export const findAllComments = ({ productId, params }: { productId: string; params: CommentQueryParams }) => {
  const { offset = "1", limit = "20" } = params;

  return useQuery({
    queryKey: ["find-all-comments", productId, offset, limit],
    queryFn: () => commentService.findAllComments({ productId, params }),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};

export const updateComment = () => {
  return useMutation({
    mutationFn: (data: { commentId: string; data: CommentRequestDTO }) => commentService.updateComment(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-comments"] });
      toast.success(data.message);
    },
  });
};

export const deleteComment = () => {
  return useMutation({
    mutationFn: (data: { commentId: string }) => commentService.deleteComment(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-comments"] });
      toast.success(data.message);
    },
  });
};
