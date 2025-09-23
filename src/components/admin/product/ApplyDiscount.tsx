import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { applyDiscountSchema } from "@/schemas/productSchema";
import { findAllDiscounts } from "@/hooks/useDiscount";
import type { ProductDTO } from "@/types/productTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyDiscount } from "@/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface ApplyDiscountProps {
  product: ProductDTO | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ApplyDiscount = ({ product, isOpen, setIsOpen }: ApplyDiscountProps) => {
  const { data, isLoading } = findAllDiscounts();
  const { mutate, isPending } = applyDiscount();

  const applyDiscountForm = useForm({
    resolver: zodResolver(applyDiscountSchema),
    mode: "onChange",
    defaultValues: {
      discountId: "",
      productId: "",
    },
  });

  const handleApplyDiscount = () => {
    mutate(applyDiscountForm.getValues(), {
      onSuccess: () => {
        setIsOpen(false);
        applyDiscountForm.reset();
      },
    });
  };

  useEffect(() => {
    if (product && isOpen) {
      applyDiscountForm.reset({
        discountId: "",
        productId: product.productId,
      });
    }
  }, [product, isOpen, applyDiscountForm]);

  const resetForm = () => {
    setIsOpen(false);
    applyDiscountForm.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={resetForm}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Aplicar Desconto</DialogTitle>
          <DialogDescription>Preencha as informações abaixo para aplicar o desconto</DialogDescription>
        </DialogHeader>
        <Form {...applyDiscountForm}>
          <form
            onSubmit={applyDiscountForm.handleSubmit(handleApplyDiscount)}
            className="space-y-6"
          >
            <FormField
              control={applyDiscountForm.control}
              name="discountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desconto</FormLabel>
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
                          data?.data.map((discount) => (
                            <SelectItem
                              key={discount.discountId}
                              value={String(discount.discountId)}
                            >
                              {discount.name} - <strong>{discount.percent}% OFF</strong>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {applyDiscountForm.formState.errors.discountId && <FormMessage>{applyDiscountForm.formState.errors.discountId.message}</FormMessage>}
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
                <span>Aplicar Desconto</span>
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
