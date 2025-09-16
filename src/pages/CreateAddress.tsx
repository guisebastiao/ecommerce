import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addressSchema } from "@/schemas/addressSchema";
import { MaskedInput } from "@/components/MaskedInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAddress } from "@/hooks/useAddress";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const CreateAddress = () => {
  const { mutate, isPending, isSuccess } = createAddress();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const navigate = useNavigate();

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

  useEffect(() => {
    if (isSuccess) {
      navigate(redirect ?? "/");
    }
  }, [isSuccess]);

  const handleCreateAddress = () => {
    mutate(addressForm.getValues());
  };

  return (
    <section className="w-full h-[calc(100vh-80px-190px)] flex justify-center items-center gap-6 py-4 md:px-6 px-3">
      <Form {...addressForm}>
        <form
          onSubmit={addressForm.handleSubmit(handleCreateAddress)}
          className="max-w-xl w-full flex flex-col gap-8"
        >
          <div className="space-y-3">
            <h1 className="text-3xl font-medium text-center">Create Endereço</h1>
          </div>
          <FormField
            control={addressForm.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Rua"
                    className="px-0"
                  />
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
                  <Input
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Número"
                    className="px-0"
                  />
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
                  <Input
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Complemento"
                    className="px-0"
                  />
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
                  <Input
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Bairro"
                    className="px-0"
                  />
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
                  <Input
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Cidade"
                    className="px-0"
                  />
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
                  <Input
                    {...field}
                    type="text"
                    autoComplete="off"
                    placeholder="Estado"
                    className="px-0"
                  />
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
                  <MaskedInput
                    {...field}
                    mask="00000-000"
                    type="text"
                    placeholder="Código Postal"
                    autoComplete="off"
                    className="px-0"
                  />
                </FormControl>
                {addressForm.formState.errors.zip?.message && <FormMessage>{addressForm.formState.errors.zip.message}</FormMessage>}
              </FormItem>
            )}
          />
          <Button
            className="bg-primary-theme hover:bg-primary-theme-hover cursor-pointer"
            disabled={isPending}
          >
            {isPending && <Spinner className="size-4 border-t-white" />}
            Criar Endereço
          </Button>
        </form>
      </Form>
    </section>
  );
};
