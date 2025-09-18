import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { commentSchema } from "@/schemas/commentSchema";
import type { CommentDTO } from "@/types/commentTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { updateComment } from "@/hooks/useComment";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Spinner } from "./Spinner";

interface UpdateCommentProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  comment: CommentDTO;
}

const UpdateComment = ({ isOpen, setIsOpen, comment }: UpdateCommentProps) => {
  const { mutate, isPending } = updateComment();

  const updateCommentForm = useForm({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      content: comment.content,
    },
  });

  const handleUpdateComment = () => {
    mutate(
      {
        commentId: comment.commentId,
        data: updateCommentForm.getValues(),
      },
      {
        onSuccess: () => {
          updateCommentForm.reset(), setIsOpen(false);
        },
      }
    );
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Comentário</DialogTitle>
          <DialogDescription>Você pode editar seu comentário aqui abaixo:</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...updateCommentForm}>
            <form onSubmit={updateCommentForm.handleSubmit(handleUpdateComment)} className="space-y-4">
              <FormField
                control={updateCommentForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Edite seu comentário" className="resize-none" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Spinner className="size-4 border-t-white" />}
                <span>Salvar</span>
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateComment;
