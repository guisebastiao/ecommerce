import { Github, Linkedin, Mail } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-muted/50 flex items-center flex-col">
      <div className="flex max-w-6xl w-full md:justify-between md:items-center md:px-20 px-5 py-5 gap-5 md:flex-row flex-col">
        <div className="max-w-72">
          <h2 className="text-xl font-bold">Ecommerce</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Plataforma de e-commerce demonstrativa, criada para aprendizado e
            demonstração técnica.
          </p>
        </div>
        <div className="max-w-72 w-full flex md:items-center flex-col">
          <ul className="space-y-2 text-sm">
            <h3 className="text-lg font-semibold mb-3">Links</h3>
            <li>
              <NavLink
                className="hover:underline"
                to="/"
              >
                Início
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="hover:underline"
              >
                Produtos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className="hover:underline"
              >
                Carrinho
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/favorites"
                className="hover:underline"
              >
                Favoritos
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Suporte</h3>
          <div className="flex gap-2 items-center">
            <Mail className="size-5" />
            <p className="text-sm">guilhermesebastiaou.u@gmail.com</p>
          </div>

          <div className="flex gap-4 mt-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="size-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="size-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="w-full border-t text-center py-4 text-sm text-muted-foreground">
        <span>
          &copy; {new Date().getFullYear()} Ecommerce. Todos os direitos
          reservados.
        </span>
      </div>
    </footer>
  );
};
