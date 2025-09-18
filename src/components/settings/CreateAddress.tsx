import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { addressSchema } from "@/schemas/addressSchema";
import { MaskedInput } from "@/components/MaskedInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAddress } from "@/hooks/useAddress";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export const CreateAddress = () => {
  const { mutate, isPending } = createAddress();

  const addressForm = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zip: "",
      country: "Brasil",
    },
  });

  const handleCreateAddress = () => {
    mutate(addressForm.getValues(), { onSuccess: () => addressForm.reset() });
  };

  return (
    <Form {...addressForm}>
      <form onSubmit={addressForm.handleSubmit(handleCreateAddress)} className="space-y-8 p-1.5">
        <h1 className="font-medium">Criar Endereço</h1>
        <FormField
          control={addressForm.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="text" autoComplete="off" placeholder="Rua" className="px-0" />
              </FormControl>
              {addressForm.formState.errors.street?.message && <FormMessage>{addressForm.formState.errors.street.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="text" autoComplete="off" placeholder="Número" className="px-0" />
              </FormControl>
              {addressForm.formState.errors.number?.message && <FormMessage>{addressForm.formState.errors.number.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="text" autoComplete="off" placeholder="Complemento" className="px-0" />
              </FormControl>
              {addressForm.formState.errors.complement?.message && <FormMessage>{addressForm.formState.errors.complement.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="text" autoComplete="off" placeholder="Bairro" className="px-0" />
              </FormControl>
              {addressForm.formState.errors.neighborhood?.message && <FormMessage>{addressForm.formState.errors.neighborhood.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="text" autoComplete="off" placeholder="Cidade" className="px-0" />
              </FormControl>
              {addressForm.formState.errors.city?.message && <FormMessage>{addressForm.formState.errors.city.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="text" autoComplete="off" placeholder="Estado" className="px-0" />
              </FormControl>
              {addressForm.formState.errors.state?.message && <FormMessage>{addressForm.formState.errors.state.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={addressForm.control}
          name="zip"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MaskedInput {...field} mask="00000-000" type="text" placeholder="Código Postal" autoComplete="off" className="px-0" />
              </FormControl>
              {addressForm.formState.errors.zip?.message && <FormMessage>{addressForm.formState.errors.zip.message}</FormMessage>}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary-theme hover:bg-primary-theme-hover cursor-pointer" disabled={isPending}>
          {isPending && <Spinner className="size-4 border-t-white" />}
          <span>Criar Endereço</span>
        </Button>
      </form>
    </Form>
  );
};
