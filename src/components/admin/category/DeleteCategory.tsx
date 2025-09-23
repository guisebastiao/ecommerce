import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { CategoryDTO } from "@/types/categoryTypes";
import { deleteCategory } from "@/hooks/useCategory";
import { Spinner } from "../../Spinner";
import { Trash2 } from "lucide-react";

interface DeleteCategoryProps {
  category: CategoryDTO | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const DeleteCategory = ({ category, isOpen, setIsOpen }: DeleteCategoryProps) => {
  const { mutate, isPending } = deleteCategory();

  const handleDeleteCategory = () => {
    if (!category) return;
    mutate({ categoryId: String(category.categoryId) });
  };

  if (!category) return null;

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
            Tem certeza que deseja excluir a categoria <strong className="capitalize">"{category.name.toLowerCase()}"</strong>?
            <br />
            <span className="text-destructive font-medium">Esta ação não pode ser desfeita.</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteCategory}
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
