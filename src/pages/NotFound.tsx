import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full flex flex-col items-center justify-center gap-10 py-20">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-center text-5xl font-medium">404 Not Found</h1>
        <p className="text-center text-sm">A página visitada não foi encontrada. Você pode ir para a página inicial</p>
      </div>
      <Button className="w-fit bg-primary-theme hover:bg-primary-theme-hover cursor-pointer" onClick={() => navigate("/")}>
        Voltar Para Página Inícial
      </Button>
    </section>
  );
};
