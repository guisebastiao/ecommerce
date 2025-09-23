import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { categorySchema } from "@/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "@/hooks/useCategory";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface CreateCategoryProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateCategory = ({ isOpen, setIsOpen }: CreateCategoryProps) => {
  const { mutate, isPending } = createCategory();

  const createCategoryForm = useForm({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const handleCreateCategory = () => {
    mutate(createCategoryForm.getValues(), {
      onSuccess: () => {
        createCategoryForm.reset();
        setIsOpen(false);
      },
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    createCategoryForm.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Criar Nova Categoria</DialogTitle>
          <DialogDescription>Preencha as informações abaixo para criar um nova categoria</DialogDescription>
        </DialogHeader>
        <Form {...createCategoryForm}>
          <form
            onSubmit={createCategoryForm.handleSubmit(handleCreateCategory)}
            className="space-y-6"
          >
            <FormField
              control={createCategoryForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Categoria</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do desconto"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  {createCategoryForm.formState.errors.name && <FormMessage>{createCategoryForm.formState.errors.name.message}</FormMessage>}
                </FormItem>
              )}
            />
            <div className="flex gap-3 justify-end pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isPending}
              >
                {isPending && <Spinner className="size-4 border-t-white" />}
                Criar Categoria
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
