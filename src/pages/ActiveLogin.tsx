import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate, useParams } from "react-router-dom";
import { activeLoginSchema } from "@/schemas/authSchema";
import { useContextAuth } from "@/context/authContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { activeLogin } from "@/hooks/useAuth";
import { useEffect } from "react";

const ActiveLogin = () => {
  const { code } = useParams();

  const { setAuthenticated, setClient } = useContextAuth();

  const navigate = useNavigate();

  const { mutate, isPending, isSuccess, data } = activeLogin();

  const activeLoginForm = useForm({
    resolver: zodResolver(activeLoginSchema),
    defaultValues: {
      code: code ?? "",
      verificationCode: "",
    },
  });

  const handleActiveLogin = () => {
    mutate(activeLoginForm.getValues());
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("auth", JSON.stringify(data.data));
      setAuthenticated(true);
      setClient(data.data.client);
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <section className="w-full h-[calc(100vh-80px-190px)] flex flex-col items-center justify-center gap-8 py-4 md:px-6 px-3">
      <h1 className="text-4xl text-center font-medium">Ativar Login</h1>
      <p className="max-w-xl text-center">Digite abaixo o código de 6 dígitos que enviamos para o seu e-mail. Esse código é necessário para confirmar sua identidade e garantir a segurança da sua conta.</p>
      <form onSubmit={activeLoginForm.handleSubmit(handleActiveLogin)} className="w-full flex flex-col items-center gap-6">
        <Controller
          name="verificationCode"
          control={activeLoginForm.control}
          render={({ field }) => (
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        <Button type="submit" className="max-w-xl w-full bg-primary-theme hover:bg-primary-theme-hover cursor-pointer">
          {isPending ? <Spinner className="size-4 border-t-white" /> : <span>Verificar</span>}
        </Button>
      </form>
    </section>
  );
};

export default ActiveLogin;
