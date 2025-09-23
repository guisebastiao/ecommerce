import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import { Menu } from "lucide-react";

import { ManageProduct } from "@/components/admin/product/ManageProduct";
import { ManageDiscount } from "@/components/admin/discount/ManageDiscount";
import { ManageCategory } from "@/components/admin/category/ManageCategory";

export const Admin = () => {
  const renderComponent = new Map<string, React.FC>([
    ["manage-products", ManageProduct],
    ["manage-discounts", ManageDiscount],
    ["manage-categories", ManageCategory],
  ]);

  const [searchParams, setSearchParams] = useSearchParams({
    tab: "manage-products",
  });

  const activeTab = searchParams.get("tab");
  const ActiveComponent = renderComponent.get(activeTab ?? "products");

  return (
    <section className="w-full flex flex-col gap-3 py-4 px-4">
      <header className="flex justify-between items-center py-3">
        <h2 className="font-medium text-lg">Administração</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="md:hidden size-8 flex"
            >
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Gerenciar Ecommerce</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSearchParams({ tab: "manage-products" })}>Produtos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchParams({ tab: "manage-discounts" })}>Descontos</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchParams({ tab: "manage-categories" })}>Categorias</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex gap-10">
        <nav className="md:block hidden max-w-3xs p-2">
          <h3 className="text-[15px] font-semibold">Gerenciar Ecommerce</h3>
          <ul>
            <li className="text-[13px]">
              <Button
                variant="link"
                className={twMerge("text-zinc-500", activeTab === "manage-products" && "text-primary-theme")}
                onClick={() => setSearchParams({ tab: "manage-products" })}
              >
                Produtos
              </Button>
            </li>
            <li className="text-[13px]">
              <Button
                variant="link"
                className={twMerge("text-zinc-500", activeTab === "manage-discounts" && "text-primary-theme")}
                onClick={() => setSearchParams({ tab: "manage-discounts" })}
              >
                Descontos
              </Button>
            </li>
            <li className="text-[13px]">
              <Button
                variant="link"
                className={twMerge("text-zinc-500", activeTab === "manage-categories" && "text-primary-theme")}
                onClick={() => setSearchParams({ tab: "manage-categories" })}
              >
                Categorias
              </Button>
            </li>
          </ul>
        </nav>
        <article className="flex-1">{ActiveComponent ? <ActiveComponent /> : null}</article>
      </div>
    </section>
  );
};
