import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { deleteComment } from "@/hooks/useComment";

interface DeleteCommentProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  commentId: string;
}

export const DeleteComment = ({ isOpen, setIsOpen, commentId }: DeleteCommentProps) => {
  const { mutate, isPending } = deleteComment();

  const handleDeleteComment = () => {
    mutate(
      { commentId },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar Comentário</AlertDialogTitle>
          <AlertDialogDescription>Você realmente deseja excluir esse comentário? Essa ação não pode ser desfeita.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDeleteComment}>
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
