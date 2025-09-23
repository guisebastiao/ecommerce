import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { discountSchema } from "@/schemas/discountSchema";
import { MaskedInput } from "@/components/MaskedInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDiscount } from "@/hooks/useDiscount";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

interface CreateDiscountProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateDiscount = ({ isOpen, setIsOpen }: CreateDiscountProps) => {
  const { mutate, isPending } = createDiscount();

  const createDiscountForm = useForm({
    resolver: zodResolver(discountSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      percent: undefined,
      endDate: undefined,
    },
  });

  const handleCreateDiscount = () => {
    mutate(createDiscountForm.getValues(), {
      onSuccess: () => {
        createDiscountForm.reset();
        setIsOpen(false);
      },
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    createDiscountForm.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Criar Novo Desconto</DialogTitle>
          <DialogDescription>Preencha as informações abaixo para criar um novo desconto</DialogDescription>
        </DialogHeader>
        <Form {...createDiscountForm}>
          <form
            onSubmit={createDiscountForm.handleSubmit(handleCreateDiscount)}
            className="space-y-6"
          >
            <FormField
              control={createDiscountForm.control}
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
                  {createDiscountForm.formState.errors.name && <FormMessage>{createDiscountForm.formState.errors.name.message}</FormMessage>}
                </FormItem>
              )}
            />
            <FormField
              control={createDiscountForm.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia do Fim do Desconto</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="w-full appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none [&::-webkit-datetime-edit]:text-muted-foreground focus:[&::-webkit-datetime-edit]:text-black"
                      min={format(new Date(), "yyyy-MM-dd")}
                      {...field}
                    />
                  </FormControl>
                  {createDiscountForm.formState.errors.endDate && <FormMessage>{createDiscountForm.formState.errors.endDate.message}</FormMessage>}
                </FormItem>
              )}
            />
            <FormField
              control={createDiscountForm.control}
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
                  {createDiscountForm.formState.errors.percent && <FormMessage>{createDiscountForm.formState.errors.percent.message}</FormMessage>}
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
                Criar Desconto
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
