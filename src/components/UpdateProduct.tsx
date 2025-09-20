import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { updateProductSchema } from "@/schemas/productSchema";
import { findAllCategories } from "@/hooks/useCategory";
import type { ProductDTO } from "@/types/productTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProduct } from "@/hooks/useProduct";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";
import { Input } from "./ui/input";

interface UpdateProductProps {
  product: ProductDTO;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const UpdateProduct = ({ product, isOpen, setIsOpen }: UpdateProductProps) => {
  const { data, isLoading } = findAllCategories();
  const { mutate, isPending } = updateProduct();

  const updateProductForm = useForm({
    resolver: zodResolver(updateProductSchema),
    mode: "onChange",
    defaultValues: {
      name: product.name,
      description: product.description,
      categoryId: String(product.category.categoryId),
      price: String(product.originalPrice),
      stock: String(product.stock),
    },
  });

  const handleCreateProduct = () => {
    mutate(
      {
        productId: product.productId,
        data: updateProductForm.getValues(),
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          updateProductForm.reset();
        },
      }
    );
  };

  const resetForm = () => {
    setIsOpen(false);
    updateProductForm.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetForm}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Editar Produto</DialogTitle>
          <DialogDescription>Modifique as informações do produto conforme necessário</DialogDescription>
        </DialogHeader>
        <Form {...updateProductForm}>
          <form onSubmit={updateProductForm.handleSubmit(handleCreateProduct)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={updateProductForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do produto" autoComplete="off" {...field} />
                    </FormControl>
                    {updateProductForm.formState.errors.name && <FormMessage>{updateProductForm.formState.errors.name.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={updateProductForm.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Select value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                        <SelectTrigger className="w-full border-b rounded-none">
                          <SelectValue placeholder="Selecionar Categoria" />
                          <ChevronDown />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading ? (
                            <Spinner className="size-5 border-t-black" />
                          ) : (
                            data?.data.map((category) => (
                              <SelectItem key={category.categoryId} value={String(category.categoryId)}>
                                {category.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {updateProductForm.formState.errors.categoryId && <FormMessage>{updateProductForm.formState.errors.categoryId.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={updateProductForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descreva o produto detalhadamente" autoComplete="off" className="min-h-[100px] resize-none" {...field} />
                  </FormControl>
                  {updateProductForm.formState.errors.description && <FormMessage>{updateProductForm.formState.errors.description.message}</FormMessage>}
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={updateProductForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input placeholder="R$ 0,00" autoComplete="off" {...field} value={field.value !== undefined && field.value !== null ? String(field.value) : ""} />
                    </FormControl>
                    {updateProductForm.formState.errors.price && <FormMessage>{updateProductForm.formState.errors.price.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={updateProductForm.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" autoComplete="off" {...field} value={field.value !== undefined && field.value !== null ? String(field.value) : ""} />
                    </FormControl>
                    {updateProductForm.formState.errors.stock && <FormMessage>{updateProductForm.formState.errors.stock.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-3 justify-end pt-6">
              <Button type="button" variant="outline" onClick={resetForm}>
                <span>Cancelar</span>
              </Button>
              <Button type="submit" disabled={isPending}>
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
