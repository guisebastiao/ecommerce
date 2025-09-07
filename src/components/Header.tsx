import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bolt, Heart, LogIn, LogOut, Package, Search, ShoppingCart, User, X } from "lucide-react";
import { matchPath, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useContextAuth } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "@/schemas/searchSchema";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const SEARCH_PATHS = ["/"];

export const Header = () => {
  const { isAuthenticated, client, handleLogout, logoutIsLoading } = useContextAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const searchForm = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: searchParams.get("search") ?? "",
    },
  });

  const shouldActive = SEARCH_PATHS.some((path) => matchPath({ path, end: true }, location.pathname));

  const handleSearch = () => {
    setSearchParams((params) => {
      params.set("search", searchForm.getValues("search"));
      return params;
    });
  };

  const handleClearQueriesParams = () => {
    searchForm.reset({ search: "" });

    setSearchParams((params) => {
      params.delete("search");
      return params;
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-center border-b h-20 z-50 bg-white">
      <div className="max-w-[1728px] w-full h-full flex justify-between items-center px-2 sm:gap-5 gap-3">
        <h1 className="text-2xl font-black cursor-pointer select-none" onClick={() => navigate("/")}>
          Ecommerce
        </h1>
        {shouldActive && (
          <Form {...searchForm}>
            <form onSubmit={searchForm.handleSubmit(handleSearch)} className="max-w-lg w-full">
              <FormField
                control={searchForm.control}
                name="search"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative flex items-center justify-end">
                        <Input
                          {...field}
                          autoComplete="off"
                          placeholder="O que você está procurando?"
                          className="border-b-0 bg-zinc-100 placeholder:text-zinc-500 rounded sm:text-sm text-xs placeholder:font-normal pr-10"
                        />
                        {searchParams.get("search") ? (
                          <button type="button" className="absolute z-10 right-2 size-6 cursor-pointer" onClick={handleClearQueriesParams}>
                            <X className=" size-5 text-zinc-800" />
                          </button>
                        ) : (
                          <button type="button" className="absolute z-10 right-2 size-6 cursor-pointer" onClick={handleSearch}>
                            <Search className="size-5 text-zinc-800" />
                          </button>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
        {!isAuthenticated && (
          <Button onClick={() => navigate("/login")}>
            <LogIn />
            <span>Entrar</span>
          </Button>
        )}
        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <Button size="icon" variant="ghost" className="cursor-pointer sm:size-10 size-9 hover:bg-transparent" onClick={() => navigate("/cart")}>
              <ShoppingCart className="size-6" />
            </Button>
            <Button size="icon" variant="ghost" className="cursor-pointer sm:size-10 size-9 hover:bg-transparent" onClick={() => navigate("/favorites")}>
              <Heart className="size-6" />
            </Button>
            <div className="size-9">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="flex size-9 cursor-pointer">
                    <AvatarImage className="rounded-full" src={client?.clientPicture?.url} />
                    <AvatarFallback>
                      <div className="sm:size-9 flex items-center justify-center bg-primary-theme rounded-full">
                        <User className="text-white" />
                      </div>
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    <Package />
                    <span>Meus pedidos</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Bolt />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} disabled={logoutIsLoading}>
                    {logoutIsLoading ? <Spinner className="size-3.5 border-2" /> : <LogOut />}
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
