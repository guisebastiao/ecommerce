import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { ChevronDown, Upload, X, Image as ImageIcon } from "lucide-react";
import { createProductSchema } from "@/schemas/productSchema";
import { acceptMimetypes } from "@/utils/acceptMimetypes";
import { findAllCategories } from "@/hooks/useCategory";
import { MaskedInput } from "@/components/MaskedInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProduct } from "@/hooks/useProduct";
import { useForm } from "react-hook-form";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import { Spinner } from "../../Spinner";
import { Input } from "../../ui/input";
import { useState } from "react";

interface CreateProductProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateProduct = ({ isOpen, setIsOpen }: CreateProductProps) => {
  const { data, isLoading } = findAllCategories();
  const { mutate, isPending } = createProduct();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const createProductForm = useForm({
    resolver: zodResolver(createProductSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      files: [],
      categoryId: "",
      price: "",
      stock: "",
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const maxImages = 20;
    const newFiles = [...imageFiles, ...files].slice(0, maxImages);

    const validFiles = newFiles.filter((file) => acceptMimetypes.includes(file.type) && file.size <= 5 * 1024 * 1024);

    setImageFiles(validFiles);

    const previews: string[] = [];
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target?.result as string);
        setImagePreviews([...previews]);
      };
      reader.readAsDataURL(file);
    });

    createProductForm.setValue("files", validFiles);
    event.target.value = "";
  };

  const removeImage = (index: number) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(newImageFiles);
    setImagePreviews(newPreviews);
    createProductForm.setValue("files", newImageFiles);
  };

  const handleCreateProduct = () => {
    const { price } = createProductForm.getValues();
    const data = {
      ...createProductForm.getValues(),
      price: price
        .replace(/[R$\s]/g, "")
        .replace(/\./g, "")
        .replace(",", "."),
    };

    mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        createProductForm.reset();
        setImageFiles([]);
        setImagePreviews([]);
      },
    });
  };

  const resetForm = () => {
    setIsOpen(false);
    createProductForm.reset();
    setImageFiles([]);
    setImagePreviews([]);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={resetForm}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Criar Novo Produto</DialogTitle>
          <DialogDescription>Preencha as informações abaixo para criar um novo produto</DialogDescription>
        </DialogHeader>
        <Form {...createProductForm}>
          <form
            onSubmit={createProductForm.handleSubmit(handleCreateProduct)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={createProductForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o nome do produto"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    {createProductForm.formState.errors.name && <FormMessage>{createProductForm.formState.errors.name.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={createProductForm.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={String(field.value || "")}
                      >
                        <SelectTrigger className="w-full border-b rounded-none">
                          <SelectValue placeholder="Selecionar Categoria" />
                          <ChevronDown />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading ? (
                            <Spinner className="size-5 border-t-black" />
                          ) : (
                            data?.data.map((category) => (
                              <SelectItem
                                key={category.categoryId}
                                value={String(category.categoryId)}
                                className="capitalize"
                              >
                                {category.name.toLowerCase()}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {createProductForm.formState.errors.categoryId && <FormMessage>{createProductForm.formState.errors.categoryId.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={createProductForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva o produto detalhadamente"
                      autoComplete="off"
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  {createProductForm.formState.errors.description && <FormMessage>{createProductForm.formState.errors.description.message}</FormMessage>}
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Imagens do Produto</FormLabel>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      imageFiles.length >= 20 ? "border-gray-200 bg-gray-50 cursor-not-allowed" : "border-gray-300"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Clique para enviar</span> ou arraste as imagens
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      disabled={imageFiles.length >= 20}
                    />
                  </label>
                </div>
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative group"
                      >
                        <div className="aspect-square rounded-lg overflow-hidden border">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">{index + 1}</div>
                      </div>
                    ))}
                  </div>
                )}
                {imagePreviews.length === 0 && (
                  <div className="flex items-center justify-center py-8 text-gray-400">
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-sm">Nenhuma imagem selecionada</p>
                    </div>
                  </div>
                )}
              </div>
            </FormItem>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={createProductForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <MaskedInput
                        {...field}
                        mask="R$ num"
                        blocks={{
                          num: {
                            mask: Number,
                            scale: 2,
                            thousandsSeparator: ".",
                            padFractionalZeros: true,
                            radix: ",",
                            mapToRadix: ["."],
                            min: 0,
                            max: 9999999999,
                          },
                        }}
                        autoComplete="off"
                        placeholder="R$ 0,00"
                        unmask="typed"
                        value={field.value ?? ""}
                        onAccept={(val) => field.onChange(val)}
                      />
                    </FormControl>
                    {createProductForm.formState.errors.price && <FormMessage>{createProductForm.formState.errors.price.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={createProductForm.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estoque</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        autoComplete="off"
                        {...field}
                        value={field.value !== undefined && field.value !== null ? String(field.value) : ""}
                      />
                    </FormControl>
                    {createProductForm.formState.errors.stock && <FormMessage>{createProductForm.formState.errors.stock.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </div>
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
                <span>Criar Produto</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
