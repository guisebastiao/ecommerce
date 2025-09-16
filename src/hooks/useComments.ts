import type { CommentRequestDTO } from "@/schemas/commentSchema";
import type { CommentQueryParams } from "@/types/commentTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { commentService } from "@/services/commentService";
import { queryClient } from "@/context/queryContext";
import { toast } from "sonner";

export const createComment = () => {
  return useMutation({
    mutationFn: (data: CommentRequestDTO) => commentService.createComment(data),
    onError(error: Error) {
      toast.error(error.message);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["find-all-comments"] });
      toast.success(data.message);
    },
  });
};

export const findAllComments = (params: CommentQueryParams) => {
  const { offset = "1", limit = "20", productId } = params;

  return useQuery({
    queryKey: ["find-all-comments", offset, limit, productId],
    queryFn: () => commentService.findAllComments(params),
    throwOnError: (error: Error) => {
      toast.error(error.message);
      return false;
    },
  });
};
