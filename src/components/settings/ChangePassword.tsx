import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { updatePasswordSchema } from "@/schemas/clientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePassword } from "@/hooks/useClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Spinner } from "../Spinner";

export const ChangePassword = () => {
  const { mutate, isPending } = updatePassword();

  const updatePasswordForm = useForm({
    resolver: zodResolver(updatePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleUpdatePassword = () => {
    mutate(updatePasswordForm.getValues(), { onSuccess: () => updatePasswordForm.reset() });
  };

  return (
    <Form {...updatePasswordForm}>
      <form onSubmit={updatePasswordForm.handleSubmit(handleUpdatePassword)} className="space-y-8 p-1.5">
        <h1 className="font-medium">Minha Conta</h1>
        <FormField
          control={updatePasswordForm.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha Atual</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Informe sua senha atual" autoComplete="off" {...field} />
              </FormControl>
              {updatePasswordForm.formState.errors.currentPassword?.message && <FormMessage>{updatePasswordForm.formState.errors.currentPassword.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={updatePasswordForm.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Informe sua nova senha" autoComplete="off" {...field} />
              </FormControl>
              {updatePasswordForm.formState.errors.newPassword?.message && <FormMessage>{updatePasswordForm.formState.errors.newPassword.message}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={updatePasswordForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Nova Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Confirme sua nova senha" autoComplete="off" {...field} />
              </FormControl>
              {updatePasswordForm.formState.errors.confirmPassword?.message && <FormMessage>{updatePasswordForm.formState.errors.confirmPassword.message}</FormMessage>}
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
