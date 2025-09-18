import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative w-full border-t bg-muted/50 flex items-center flex-col">
      <div className="flex max-w-6xl w-full md:justify-between md:items-center px-5 py-5 gap-5 md:flex-row flex-col">
        <div className="w-full">
          <h2 className="text-xl font-bold">Ecommerce</h2>
          <p className="mt-2 text-sm text-muted-foreground">Plataforma de e-commerce demonstrativa, criada para aprendizado e demonstração técnica.</p>
        </div>
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-3 text-left md:text-end">Suporte</h3>
          <div className="flex gap-2 items-center justify-start md:justify-end">
            <Mail className="size-5" />
            <p className="text-sm">guilhermesebastiaou.u@gmail.com</p>
          </div>
          <div className="flex justify-start md:justify-end gap-4 mt-4">
            <a href="https://github.com/guisebastiao" rel="noreferrer" target="_blank" className="text-muted-foreground hover:text-foreground">
              <Github className="size-5" />
            </a>
            <a href="https://www.linkedin.com/in/guilherme-sebastiao" rel="noreferrer" target="_blank" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="size-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full border-t text-center py-4 text-sm text-muted-foreground">
        <span>&copy; {new Date().getFullYear()} Ecommerce. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
};
