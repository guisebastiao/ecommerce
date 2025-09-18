import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updateAccountSchema } from "@/schemas/clientSchema";
import type { ActiveLoginDTO } from "@/types/authTypes";
import { useContextAuth } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateAccount } from "@/hooks/useClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MaskedInput } from "../MaskedInput";
import { useForm } from "react-hook-form";
import { Spinner } from "../Spinner";

export const MyAccount = () => {
  const { client, setClient } = useContextAuth();

  if (!client) return null;

  const [year, day, month] = client.birth.split("-");
  const birth = `${day}/${month}/${year}`;

  const updateAccountForm = useForm({
    resolver: zodResolver(updateAccountSchema),
    mode: "onChange",
    defaultValues: {
      name: client.name,
      surname: client.surname,
      phone: client.phone,
      birth,
    },
  });

  const { mutate, isPending } = updateAccount();

  const handleUpdateAccount = async () => {
    mutate(updateAccountSchema.parse(updateAccountForm.getValues()), {
      onSuccess: (data) => {
        const storage = localStorage.getItem("auth");
        const auth: ActiveLoginDTO = JSON.parse(storage!);

        auth.client = data.data;

        const newStorage = JSON.stringify(auth);
        localStorage.setItem("auth", newStorage);

        setClient(data.data);
      },
    });
  };

  return (
    <Form {...updateAccountForm}>
      <form onSubmit={updateAccountForm.handleSubmit(handleUpdateAccount)} className="space-y-8 p-1.5">
        <h1 className="font-medium">Minha Conta</h1>
        <FormField
          control={updateAccountForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Informe seu nome" autoComplete="off" {...field} />
              </FormControl>
              {updateAccountForm.formState.errors.name?.message && <FormMessage>{updateAccountForm.formState.errors.name.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={updateAccountForm.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Informe seu sobrenome" autoComplete="off" {...field} />
              </FormControl>
              {updateAccountForm.formState.errors.surname?.message && <FormMessage>{updateAccountForm.formState.errors.surname.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={updateAccountForm.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <MaskedInput type="text" mask="+00 (00) 00000-0000" placeholder="Informe seu número de telefone" autoComplete="off" {...field} />
              </FormControl>
              {updateAccountForm.formState.errors.phone?.message && <FormMessage>{updateAccountForm.formState.errors.phone.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={updateAccountForm.control}
          name="birth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <MaskedInput type="text" mask="00/00/0000" placeholder="Informe sua data de nascimento" autoComplete="off" {...field} />
              </FormControl>
              {updateAccountForm.formState.errors.birth?.message && <FormMessage>{updateAccountForm.formState.errors.birth.message}</FormMessage>}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary-theme hover:bg-primary-theme-hover cursor-pointer" disabled={isPending}>
          {isPending && <Spinner className="size-4 border-t-white" />}
          <span>Salvar</span>
        </Button>
      </form>
    </Form>
  );
};
