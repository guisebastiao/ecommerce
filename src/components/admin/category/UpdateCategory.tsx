import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { categorySchema } from "@/schemas/categorySchema";
import type { CategoryDTO } from "@/types/categoryTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateCategory } from "@/hooks/useCategory";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface UpdateCategoryProps {
  category: CategoryDTO | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const UpdateCategory = ({ category, isOpen, setIsOpen }: UpdateCategoryProps) => {
  const { mutate, isPending } = updateCategory();

  const updateCategoryForm = useForm({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (category && isOpen) {
      updateCategoryForm.reset({
        name: category.name.toLowerCase(),
      });
    }
  }, [category, isOpen, updateCategoryForm]);

  const handleUpdateDiscount = () => {
    mutate(
      {
        categoryId: String(category?.categoryId!),
        data: updateCategoryForm.getValues(),
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          updateCategoryForm.reset();
        },
      }
    );
  };

  const resetForm = () => {
    setIsOpen(false);
    updateCategoryForm.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={resetForm}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Editar Categoria</DialogTitle>
          <DialogDescription>Modifique as informações da categoria conforme necessário</DialogDescription>
        </DialogHeader>
        <Form {...updateCategoryForm}>
          <form
            onSubmit={updateCategoryForm.handleSubmit(handleUpdateDiscount)}
            className="space-y-6"
          >
            <FormField
              control={updateCategoryForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Desconto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do desconto"
                      autoComplete="off"
                      className="capitalize"
                      {...field}
                    />
                  </FormControl>
                  {updateCategoryForm.formState.errors.name && <FormMessage>{updateCategoryForm.formState.errors.name.message}</FormMessage>}
                </FormItem>
              )}
            />
            <div className="flex gap-3 justify-end pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                <span>Cancelar</span>
              </Button>
              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending && <Spinner className="size-4 border-t-white" />}
                <span>Salvar</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
