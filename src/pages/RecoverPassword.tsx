import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { resetPasswordSchema } from "@/schemas/recoverPasswordSchema";
import { resetPassword } from "@/hooks/useRecoverPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const RecoverPassword = () => {
  const { mutate, isPending, isSuccess } = resetPassword();
  const navigate = useNavigate();
  const { code } = useParams();

  const recoverPasswordForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleRecoverPassword = () => {
    mutate({ code: code!, data: recoverPasswordForm.getValues() });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <section className="w-full h-[calc(100vh-80px-190px)] flex flex-col items-center justify-center gap-8 py-4 md:px-6 px-3">
      <Form {...recoverPasswordForm}>
        <form onSubmit={recoverPasswordForm.handleSubmit(handleRecoverPassword)} className="max-w-xl w-full flex flex-col gap-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-medium text-center">Redefinir Senha</h1>
          </div>
          <FormField
            control={recoverPasswordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" autoComplete="off" placeholder="Informe sua nova senha" className="px-0" />
                </FormControl>
                {recoverPasswordForm.formState.errors.newPassword?.message && <FormMessage>{recoverPasswordForm.formState.errors.newPassword.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={recoverPasswordForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" autoComplete="off" placeholder="Confirme sua nova senha" className="px-0" />
                </FormControl>
                {recoverPasswordForm.formState.errors.confirmPassword?.message && <FormMessage>{recoverPasswordForm.formState.errors.confirmPassword.message}</FormMessage>}
              </FormItem>
            )}
          />
          <Button className="bg-primary-theme hover:bg-primary-theme-hover cursor-pointer" disabled={isPending}>
            {isPending && <Spinner className="size-4 border-white border-t-transparent" />}
            <span>Redefinir</span>
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default RecoverPassword;
