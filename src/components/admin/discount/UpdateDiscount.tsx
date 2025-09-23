import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { discountSchema } from "@/schemas/discountSchema";
import type { DiscountDTO } from "@/types/discountTypes";
import { MaskedInput } from "@/components/MaskedInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDiscount } from "@/hooks/useDiscount";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface UpdateDiscountProps {
  discount: DiscountDTO | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const UpdateDiscount = ({ discount, isOpen, setIsOpen }: UpdateDiscountProps) => {
  const { mutate, isPending } = updateDiscount();

  const updateDiscountForm = useForm({
    resolver: zodResolver(discountSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      endDate: "",
      percent: "",
    },
  });

  useEffect(() => {
    if (discount && isOpen) {
      updateDiscountForm.reset({
        name: discount.name,
        endDate: discount.endDate,
        percent: String(discount.percent),
      });
    }
  }, [discount, isOpen, updateDiscountForm]);

  const handleUpdateDiscount = () => {
    mutate(
      {
        discountId: discount?.discountId!,
        data: updateDiscountForm.getValues(),
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          updateDiscountForm.reset();
        },
      }
    );
  };

  const resetForm = () => {
    setIsOpen(false);
    updateDiscountForm.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={resetForm}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Editar Desconto</DialogTitle>
          <DialogDescription>Modifique as informações do desconto conforme necessário</DialogDescription>
        </DialogHeader>
        <Form {...updateDiscountForm}>
          <form
            onSubmit={updateDiscountForm.handleSubmit(handleUpdateDiscount)}
            className="space-y-6"
          >
            <FormField
              control={updateDiscountForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Desconto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do desconto"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  {updateDiscountForm.formState.errors.name && <FormMessage>{updateDiscountForm.formState.errors.name.message}</FormMessage>}
                </FormItem>
              )}
            />
            <FormField
              control={updateDiscountForm.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia do Fim do Desconto</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="w-full appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none [&::-webkit-datetime-edit]:text-muted-foreground focus:[&::-webkit-datetime-edit]:text-black"
                      {...field}
                    />
                  </FormControl>
                  {updateDiscountForm.formState.errors.endDate && <FormMessage>{updateDiscountForm.formState.errors.endDate.message}</FormMessage>}
                </FormItem>
              )}
            />
            <FormField
              control={updateDiscountForm.control}
              name="percent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do Desconto</FormLabel>
                  <FormControl>
                    <MaskedInput
                      {...(field as any)}
                      mask="num%"
                      blocks={{
                        num: {
                          mask: Number,
                          scale: 2,
                          min: 0.01,
                          max: 100,
                        },
                      }}
                      unmask="typed"
                      placeholder="0,00%"
                      onAccept={(val) => field.onChange(val)}
                    />
                  </FormControl>
                  {updateDiscountForm.formState.errors.percent && <FormMessage>{updateDiscountForm.formState.errors.percent.message}</FormMessage>}
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
