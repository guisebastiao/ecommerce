import { useNavigate, useParams } from "react-router-dom";
import { activeRegister } from "@/hooks/useAuth";
import { Spinner } from "@/components/Spinner";
import { useEffect } from "react";

export const ActiveAccount = () => {
  const { verificationCode } = useParams();
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess, isError } = activeRegister();

  useEffect(() => {
    mutate(
      { verificationCode: verificationCode! },
      {
        onSuccess: () => navigate("/login"),
        onError: () => navigate("/register"),
      }
    );
  }, []);

  return (
    <section className="w-full h-[calc(100vh-80px-190px)] flex flex-col items-center justify-center gap-8 py-4 px-4">
      {isPending ? (
        <div className="flex items-center gap-2">
          <Spinner className="size-5 border-t-black" />
          <h1 className="text-xl font-medium">Ativando sua conta</h1>
        </div>
      ) : isSuccess ? (
        <h1>Sua conta foi ativada com sucesso</h1>
      ) : isError ? (
        <h1 className="text-xl font-medium">Erro ao ativar sua conta</h1>
      ) : (
        <h1 className="text-xl font-medium">Ativar conta</h1>
      )}
    </section>
  );
};
