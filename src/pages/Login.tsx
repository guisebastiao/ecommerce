import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { login } from "@/hooks/useAuth";
import { LogIn } from "lucide-react";

export const Login = () => {
  const { mutate, isPending } = login();
  const navigate = useNavigate();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = () => {
    mutate(loginForm.getValues(), {
      onSuccess: ({ data }) => {
        navigate(`/active-login/${data.code}`);
      },
    });
  };

  return (
    <section className="w-full flex justify-center items-center gap-6 py-4 px-4">
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="max-w-xl w-full flex flex-col gap-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-medium text-center">Entrar</h1>
          </div>
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" autoComplete="off" placeholder="Email" className="px-0" />
                </FormControl>
                {loginForm.formState.errors.email?.message && <FormMessage>{loginForm.formState.errors.email.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" autoComplete="off" placeholder="Senha" className="px-0" />
                </FormControl>
                {loginForm.formState.errors.password?.message && <FormMessage>{loginForm.formState.errors.password.message}</FormMessage>}
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col gap-3">
            <Button className="bg-primary-theme hover:bg-primary-theme-hover cursor-pointer" disabled={isPending}>
              {isPending ? <Spinner className="size-4 border-t-white" /> : <LogIn />}
              <span>Entrar</span>
            </Button>
            <Button type="button" variant="secondary" className="cursor-pointer border" onClick={() => navigate("/register")} disabled={isPending}>
              Criar Minha Conta
            </Button>
          </div>
          <Button type="button" variant="link" className="cursor-pointer" disabled={isPending} onClick={() => navigate("/forgot-password")}>
            Esqueci minha senha
          </Button>
        </form>
      </Form>
    </section>
  );
};
