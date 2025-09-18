import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { EllipsisVertical, PencilRuler, Send, Trash, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createComment, findAllComments } from "@/hooks/useComment";
import type { CommentQueryParams } from "@/types/commentTypes";
import { commentSchema } from "@/schemas/commentSchema";
import { useContextAuth } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { DeleteComment } from "./DeleteComment";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import UpdateComment from "./UpdateComment";
import { useForm } from "react-hook-form";
import { ptBR } from "date-fns/locale";
import { Spinner } from "./Spinner";
import { useState } from "react";

interface CommentProps {
  productId: string;
}

export const Comment = ({ productId }: CommentProps) => {
  const { isAuthenticated } = useContextAuth();

  const [editCommentOpen, setEditCommentOpen] = useState(false);
  const [deleteCommentOpen, setDeleteCommentOpen] = useState(false);

  const commentForm = useForm({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const [searchParams] = useSearchParams({
    offset: "1",
    limit: "20",
  });

  const params = Object.fromEntries(searchParams.entries()) as {
    [K in keyof CommentQueryParams]: string;
  };

  const { data, isLoading } = findAllComments({ productId, params });
  const { mutate, isPending } = createComment();

  const formatDate = (createdAt: Date) => {
    return formatDistanceToNow(createdAt, {
      addSuffix: false,
      locale: ptBR,
    }).replace("cerca de ", "");
  };

  const handleComment = () => {
    mutate(
      { productId: productId, data: commentForm.getValues() },
      {
        onSuccess: () => commentForm.reset(),
      }
    );
  };

  return (
    <div>
      <h3 className="text-xl font-bold py-3">Comentários</h3>
      <div className="flex flex-col p-2.5 gap-4">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner className="size-5 border-t-black" />
          </div>
        ) : !data || data.data.items.length <= 0 ? (
          <div className="w-full flex flex-col items-center space-y-2">
            <h3 className="font-bold text-center">Nenhum comentário foi encontrado</h3>
            <p className="text-sm text-center">Faça seu comentário...</p>
          </div>
        ) : (
          data?.data.items.map((comment) => (
            <div key={comment.commentId} className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="size-10">
                    <AvatarImage className="rounded-full" src={comment.client.clientPicture?.url} />
                    <AvatarFallback>
                      <div className="size-10 flex items-center justify-center bg-primary-theme rounded-full">
                        <User className="text-white" />
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {comment.client.name} {comment.client.surname}
                    </span>
                    <p className="text-sm text-zinc-700">{comment.content}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-600 text-right">{formatDate(comment.createdAt)} atrás</span>
                  {comment.belongsToAuthUser && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="secondary" className="size-7.5 rounded-sm">
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Gerenciar</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setEditCommentOpen(!editCommentOpen)}>
                          <PencilRuler />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteCommentOpen(!deleteCommentOpen)}>
                          <Trash />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
              <UpdateComment isOpen={editCommentOpen} setIsOpen={setEditCommentOpen} comment={comment} />
              <DeleteComment isOpen={deleteCommentOpen} setIsOpen={setDeleteCommentOpen} commentId={comment.commentId} />
            </div>
          ))
        )}
      </div>
      {isAuthenticated && (
        <Form {...commentForm}>
          <form onSubmit={commentForm.handleSubmit(handleComment)} className="w-full flex gap-4 mt-5 px-2.5">
            <FormField
              control={commentForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input {...field} type="text" autoComplete="off" placeholder="Faça seu comentário" className="border rounded-sm aria-invalid:border-destructive" />
                  </FormControl>
                  {commentForm.formState.errors.content?.message && <FormMessage>{commentForm.formState.errors.content.message}</FormMessage>}
                </FormItem>
              )}
            />
            <Button size="icon" className="bg-primary-theme hover:bg-primary-theme-hover cursor-pointer" disabled={isPending}>
              {isPending ? <Spinner className="size-4 border-t-white" /> : <Send className="size-4.5" />}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
