import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

import { ManageProduct } from "@/components/admin/ManageProduct";
import { ManageDiscount } from "@/components/admin/ManageDiscount";
import { ManageCategory } from "@/components/admin/ManageCategory";

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
      </header>
      <div className="flex gap-10">
        <nav className="md:block hidden max-w-3xs p-2">
          <h3 className="text-[15px] font-semibold">Gerenciar Ecommerce</h3>
          <ul>
            <li className="text-[13px]">
              <Button variant="link" className={twMerge("text-zinc-500", activeTab === "manage-products" && "text-primary-theme")} onClick={() => setSearchParams({ tab: "manage-products" })}>
                Produtos
              </Button>
            </li>
            <li className="text-[13px]">
              <Button variant="link" className={twMerge("text-zinc-500", activeTab === "manage-discounts" && "text-primary-theme")} onClick={() => setSearchParams({ tab: "manage-discounts" })}>
                Descontos
              </Button>
            </li>
            <li className="text-[13px]">
              <Button variant="link" className={twMerge("text-zinc-500", activeTab === "manage-categories" && "text-primary-theme")} onClick={() => setSearchParams({ tab: "manage-categories" })}>
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
