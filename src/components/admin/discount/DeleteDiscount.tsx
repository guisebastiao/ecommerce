import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { DiscountDTO } from "@/types/discountTypes";
import { deleteDiscount } from "@/hooks/useDiscount";
import { Spinner } from "../../Spinner";
import { Trash2 } from "lucide-react";

interface DeleteDiscountProps {
  discount: DiscountDTO | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const DeleteDiscount = ({ discount, isOpen, setIsOpen }: DeleteDiscountProps) => {
  const { mutate, isPending } = deleteDiscount();

  const handleDeleteDiscount = () => {
    if (!discount) return;
    mutate({ discountId: discount.discountId });
  };

  if (!discount) return null;

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => setIsOpen(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Excluir Desconto
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o desconto <strong>"{discount.name}"</strong>?
            <br />
            <span className="text-destructive font-medium">Esta ação não pode ser desfeita.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteDiscount}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isPending && <Spinner className="size-4 border-t-white" />}
            <span>Excluir Desconto</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
