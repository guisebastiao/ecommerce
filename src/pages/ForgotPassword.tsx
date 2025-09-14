import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { forgotPasswordSchema } from "@/schemas/recoverPasswordSchema";
import { forgotPassword } from "@/hooks/useRecoverPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const { mutate, isPending } = forgotPassword();

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const handleForgotPassword = () => {
    mutate(forgotPasswordForm.getValues());
  };

  return (
    <section className="w-full h-[calc(100vh-80px-190px)] flex flex-col items-center justify-center gap-8 py-4 md:px-6 px-3">
      <Form {...forgotPasswordForm}>
        <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="max-w-xl w-full flex flex-col gap-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-medium text-center">Recuperar Senha</h1>
            <p className="text-sm text-center">Informe o e-mail cadastrado em sua conta e enviaremos um link para redefinir sua senha</p>
          </div>
          <FormField
            control={forgotPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" autoComplete="off" placeholder="Email" className="px-0" />
                </FormControl>
                {forgotPasswordForm.formState.errors.email?.message && <FormMessage>{forgotPasswordForm.formState.errors.email.message}</FormMessage>}
              </FormItem>
            )}
          />
          <Button className="bg-primary-theme hover:bg-primary-theme-hover cursor-pointer" disabled={isPending}>
            {isPending && <Spinner className="size-4 border-t-white" />}
            <span>Enviar</span>
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ForgotPassword;
