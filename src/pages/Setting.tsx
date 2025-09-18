import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

import { MyAccount } from "@/components/settings/MyAccount";
import { ProfilePicture } from "@/components/settings/ProfilePicture";
import { ChangePassword } from "@/components/settings/ChangePassword";
import { CreateAddress } from "@/components/settings/CreateAddress";
import { MyAddresses } from "@/components/settings/MyAddresses";

export const Setting = () => {
  const renderComponent = new Map<string, React.FC>([
    ["my-account", MyAccount],
    ["profile-picture", ProfilePicture],
    ["change-password", ChangePassword],
    ["create-address", CreateAddress],
    ["my-addresses", MyAddresses],
  ]);

  const [searchParams, setSearchParams] = useSearchParams({
    tab: "my-account",
  });

  const activeTab = searchParams.get("tab");
  const ActiveComponent = renderComponent.get(activeTab ?? "my-account");

  return (
    <section className="w-full flex flex-col gap-3 py-4 md:px-6 px-4">
      <header className="flex justify-between items-center py-3">
        <h2 className="font-medium text-lg">Configurações</h2>
      </header>
      <div className="flex gap-10 min-h-[calc(100vh-80px)]">
        <nav className="max-w-3xs p-2">
          <h3 className="text-[15px] font-semibold">Gerenciar Minha Conta</h3>
          <ul>
            <li className="text-[13px]">
              <Button variant="link" className={twMerge("text-zinc-500", activeTab === "my-account" && "text-primary-theme")} onClick={() => setSearchParams({ tab: "my-account" })}>
                Minha Conta
              </Button>
            </li>
            <li className="text-[13px]">
              <Button variant="link" className={twMerge("text-zinc-500", activeTab === "profile-picture" && "text-primary-theme")} onClick={() => setSearchParams({ tab: "profile-picture" })}>
                Foto de Perfil
              </Button>
            </li>
            <li className="text-[13px]">
              <Button variant="link" className={twMerge("text-zinc-500", activeTab === "change-password" && "text-primary-theme")} onClick={() => setSearchParams({ tab: "change-password" })}>
                Redefinir Senha
              </Button>
            </li>
          </ul>
          <h3 className="text-[15px] font-semibold mt-3">Gerenciar Endereços</h3>
          <ul>
            <li className="text-[13px]">
              <Button variant="link" className={twMerge("text-zinc-500", activeTab === "create-address" && "text-primary-theme")} onClick={() => setSearchParams({ tab: "create-address" })}>
                Criar Endereço
              </Button>
            </li>
            <li className="text-[13px]">
              <Button variant="link" className={twMerge("text-zinc-500", activeTab === "my-addresses" && "text-primary-theme")} onClick={() => setSearchParams({ tab: "my-addresses" })}>
                Meus Endereços
              </Button>
            </li>
          </ul>
        </nav>
        <article className="flex-1">{ActiveComponent ? <ActiveComponent /> : null}</article>
      </div>
    </section>
  );
};
