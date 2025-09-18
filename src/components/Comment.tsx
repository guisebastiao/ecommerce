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
      { productId, data: commentForm.getValues() },
      {
        onSuccess: () => commentForm.reset(),
      }
    );
  };

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold">Comentários</h3>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Spinner className="size-6 border-t-black" />
          </div>
        ) : !data || data.data.items.length <= 0 ? (
          <div className="text-center space-y-2 py-6 bg-zinc-50 rounded-md border">
            <h3 className="font-semibold text-zinc-800">Nenhum comentário encontrado</h3>
            <p className="text-sm text-zinc-600">Seja o primeiro a comentar!</p>
          </div>
        ) : (
          data.data.items.map((comment) => (
            <div key={comment.commentId} className="flex flex-col space-y-2.5 border-b pb-4 last:border-0">
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-3 items-center">
                  <Avatar className="size-10">
                    <AvatarImage className="rounded-full" src={comment.client.clientPicture?.url} />
                    <AvatarFallback>
                      <div className="size-10 flex items-center justify-center bg-primary-theme rounded-full">
                        <User className="text-white size-5" />
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900">
                      {comment.client.name} {comment.client.surname}
                    </span>
                    <p className="text-sm text-zinc-700">{comment.content}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500 whitespace-nowrap">{formatDate(comment.createdAt)} atrás</span>
                  {comment.belongsToAuthUser && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="secondary" className="size-7.5 rounded-md">
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
          <form onSubmit={commentForm.handleSubmit(handleComment)} className="flex gap-3">
            <FormField
              control={commentForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input {...field} type="text" autoComplete="off" placeholder="Escreva seu comentário..." className="border rounded-md" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size="icon" className="bg-primary-theme hover:bg-primary-theme-hover" disabled={isPending}>
              {isPending ? <Spinner className="size-4 border-t-white" /> : <Send className="size-4.5" />}
            </Button>
          </form>
        </Form>
      )}
    </section>
  );
};
