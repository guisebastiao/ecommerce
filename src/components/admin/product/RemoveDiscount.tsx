import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { ProductDTO } from "@/types/productTypes";
import { removeDiscount } from "@/hooks/useProduct";
import { Spinner } from "@/components/Spinner";
import { Trash2 } from "lucide-react";

interface RemoveDiscountProps {
  product: ProductDTO | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const RemoveDiscount = ({ product, isOpen, setIsOpen }: RemoveDiscountProps) => {
  const { mutate, isPending } = removeDiscount();

  const handleRemoveDiscount = () => {
    if (!product) return;
    mutate({ productId: product.productId });
  };

  if (!product) return null;

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Remover Desconto
          </AlertDialogTitle>
          <AlertDialogDescription>Tem certeza que deseja remover o desconto do produto?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleRemoveDiscount}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isPending && <Spinner className="size-4 border-t-white" />}
            <span>Remover Desconto</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
