import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { ProductDTO } from "@/types/productTypes";
import { deleteProduct } from "@/hooks/useProduct";
import { Trash2 } from "lucide-react";
import { Spinner } from "./Spinner";

interface DeleteProductProps {
  product: ProductDTO;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const DeleteProduct = ({ product, isOpen, setIsOpen }: DeleteProductProps) => {
  const { mutate, isPending } = deleteProduct();

  const handleDeleteProduct = () => {
    mutate({ productId: product.productId });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Excluir Produto
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o produto <strong>"{product.name}"</strong>?
            <br />
            <span className="text-destructive font-medium">Esta ação não pode ser desfeita.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProduct} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
            {isPending && <Spinner className="size-4 border-t-white" />}
            <span>Excluir Produto</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
