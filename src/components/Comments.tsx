import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createComment, findAllComments } from "@/hooks/useComments";
import type { CommentQueryParams } from "@/types/commentTypes";
import { commentSchema } from "@/schemas/commentSchema";
import { useContextAuth } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { EllipsisVertical, Send, User } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { Spinner } from "./Spinner";

export const Comments = () => {
  const { isAuthenticated } = useContextAuth();

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

  const { data, isLoading } = findAllComments(params);
  const { mutate, isPending } = createComment();

  const formatDate = (createdAt: Date) => {
    return formatDistanceToNow(createdAt, {
      addSuffix: true,
      locale: ptBR,
    });
  };

  const handleComment = () => {
    mutate(commentForm.getValues());
  };

  return (
    <div className="px-2.5 py-5">
      <h3 className="text-xl font-bold py-3">Comentários</h3>
      <div className="flex flex-col p-2.5 gap-2.5">
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
            <div
              key={comment.commentId}
              className="space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="size-10">
                    <AvatarImage
                      className="rounded-full"
                      src={comment.client.clientPicture?.url}
                    />
                    <AvatarFallback>
                      <div className="size-10 flex items-center justify-center bg-primary-theme rounded-full">
                        <User className="text-white" />
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-base font-medium">{comment.client.name}</span>
                    <span className="text-sm text-zinc-600">{comment.client.surname}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-600 text-right">comentado {formatDate(comment.createdAt)} atrás</span>
                  {comment.belongsToAuthUser && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="size-7.5 rounded-sm"
                        >
                          <EllipsisVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Editar Comentário</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
              <p className="text-[15px] font-medium">{comment.content}</p>
            </div>
          ))
        )}
      </div>
      {isAuthenticated && (
        <Form {...commentForm}>
          <form
            onSubmit={commentForm.handleSubmit(handleComment)}
            className="w-full flex gap-4 mt-5"
          >
            <FormField
              control={commentForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      autoComplete="off"
                      placeholder="Faça seu comentário"
                      className="px-0"
                    />
                  </FormControl>
                  {commentForm.formState.errors.content?.message && <FormMessage>{commentForm.formState.errors.content.message}</FormMessage>}
                </FormItem>
              )}
            />
            <Button
              size="icon"
              className="bg-primary-theme hover:bg-primary-theme-hover cursor-pointer"
              disabled={isPending}
            >
              {isPending ? <Spinner className="size-4 border-t-white" /> : <Send className="size-5" />}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};
