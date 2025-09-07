import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MaskedInput } from "@/components/MaskedInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/schemas/authSchema";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { register } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { LogIn } from "lucide-react";
import { useEffect } from "react";

export const Register = () => {
  const { mutate, isPending, isSuccess } = register();
  const navigate = useNavigate();

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
      birth: "",
      cpf: "",
      phone: "",
    },
  });

  const handleRegister = () => {
    const data = registerSchema.parse(registerForm.getValues());
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/register-successful`);
    }
  }, [isSuccess]);

  return (
    <section className="w-full flex justify-center items-center gap-6 py-10 md:px-6 px-3">
      <Form {...registerForm}>
        <form onSubmit={registerForm.handleSubmit(handleRegister)} className="max-w-xl w-full flex flex-col gap-8">
          <div className="space-y-3">
            <h1 className="text-3xl font-medium text-center">Cadastrar</h1>
          </div>
          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" autoComplete="off" placeholder="Nome" className="px-0" />
                </FormControl>
                {registerForm.formState.errors.name?.message && <FormMessage>{registerForm.formState.errors.name.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" autoComplete="off" placeholder="Sobrenome" className="px-0" />
                </FormControl>
                {registerForm.formState.errors.surname?.message && <FormMessage>{registerForm.formState.errors.surname.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MaskedInput {...field} type="text" mask="(00) 00 00000-0000" placeholder="Telefone" autoComplete="off" className="px-0" />
                </FormControl>
                {registerForm.formState.errors.phone?.message && <FormMessage>{registerForm.formState.errors.phone.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MaskedInput {...field} mask="000.000.000-00" type="text" placeholder="CPF" autoComplete="off" className="px-0" />
                </FormControl>
                {registerForm.formState.errors.cpf?.message && <FormMessage>{registerForm.formState.errors.cpf.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="birth"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MaskedInput {...field} mask="00/00/0000" type="text" placeholder="Data de Nascimento" autoComplete="off" className="px-0" />
                </FormControl>
                {registerForm.formState.errors.birth?.message && <FormMessage>{registerForm.formState.errors.birth.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="text" autoComplete="off" placeholder="Email" className="px-0" />
                </FormControl>
                {registerForm.formState.errors.email?.message && <FormMessage>{registerForm.formState.errors.email.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" autoComplete="off" placeholder="Senha" className="px-0" />
                </FormControl>
                {registerForm.formState.errors.password?.message && <FormMessage>{registerForm.formState.errors.password.message}</FormMessage>}
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="password" autoComplete="off" placeholder="Confirmar Senha" className="px-0" />
                </FormControl>
                {registerForm.formState.errors.confirmPassword?.message && <FormMessage>{registerForm.formState.errors.confirmPassword.message}</FormMessage>}
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col gap-3">
            <Button className="bg-primary-theme hover:bg-primary-theme-hover cursor-pointer" disabled={isPending}>
              {isPending ? <Spinner className="size-4 border-white border-t-transparent" /> : <LogIn />}
              <span>Cadastrar</span>
            </Button>
            <Button type="button" variant="secondary" className="cursor-pointer border" onClick={() => navigate("/login")} disabled={isPending}>
              Entrar na Minha Conta
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};
