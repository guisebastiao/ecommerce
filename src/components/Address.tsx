import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { deleteAddress, updateAddress } from "@/hooks/useAddress";
import { addressSchema } from "@/schemas/addressSchema";
import type { AddressDTO } from "@/types/addressTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaskedInput } from "./MaskedInput";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { Spinner } from "./Spinner";
import { Input } from "./ui/input";
import { useState } from "react";

interface AddressProps {
  address: AddressDTO;
}

export const Address = ({ address }: AddressProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: mutateUpdateAddress, isPending: updateAddressPending } = updateAddress();
  const { mutate: mutateDeleteAddress } = deleteAddress();

  const addressForm = useForm({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
    defaultValues: {
      street: address.street,
      number: address.number,
      complement: address.complement || "",
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: "Brasil",
    },
  });

  const handleUpdateAddress = () => {
    mutateUpdateAddress({ addressId: address.addressId, data: addressForm.getValues() }, { onSuccess: () => setIsOpen(false) });
  };

  const handleDeleteAddress = () => {
    mutateDeleteAddress({ addressId: address.addressId });
  };

  return (
    <label className="flex items-center border rounded-md py-3 px-4 gap-2 hover:bg-gray-50/80 transition">
      <div className="flex flex-col flex-1 items-start gap-2">
        <h3 className="text-base font-medium">{address.neighborhood}</h3>
        <p className="text-sm text-gray-500">
          {address.street} {address.number} {address.complement && `${address.complement} - `}
          {address.neighborhood}, {address.city}
        </p>
        <p className="text-xs text-gray-400">
          CEP {address.zip.slice(0, 5)}-{address.zip.slice(5)}
        </p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="link" className="text-sm px-0 h-4 text-primary-theme">
              Editar Endereço
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Endereço</DialogTitle>
              <DialogDescription>Você pode editar seu endereço aqui a baixo:</DialogDescription>
            </DialogHeader>
            <div>
              <Form {...addressForm}>
                <form onSubmit={addressForm.handleSubmit(handleUpdateAddress)} className="space-y-8 p-1.5">
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
                  <Button type="submit" className="w-full cursor-pointer" disabled={updateAddressPending}>
                    {updateAddressPending && <Spinner className="size-4 border-t-white" />}
                    <span>Salvar</span>
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Endereço</AlertDialogTitle>
            <AlertDialogDescription>Você realmente deseja excluir este endereço? Esta ação não pode ser desfeita.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAddress}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </label>
  );
};
