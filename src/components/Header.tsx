import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bolt, Heart, ListFilter, LogIn, LogOut, Package, Search, ShoppingCart, User, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { matchPath, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useContextAuth } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "@/schemas/searchSchema";
import { Button } from "@/components/ui/button";
import { categories } from "@/utils/categories";
import { Spinner } from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SEARCH_PATHS = ["/"];

export const Header = () => {
  const { isAuthenticated, client, handleLogout, logoutIsLoading } = useContextAuth();

  const [filter, setFilter] = useState("clear");

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleFilter();
  }, [filter]);

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

  const handleFilter = () => {
    if (filter === "clear") {
      setSearchParams((params) => {
        params.delete("category");
        return params;
      });

      return;
    }

    setSearchParams((params) => {
      params.set("category", filter);
      return params;
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-center border-b h-20 z-50 bg-white">
      <div className="max-w-[1728px] w-full h-full flex justify-between items-center px-4 sm:gap-5 gap-3">
        <h1 className="sm:text-xl sm:block hidden font-black cursor-pointer select-none" onClick={() => navigate("/")}>
          Ecommerce
        </h1>
        <h1 className="sm:text-xl sm:hidden block font-black cursor-pointer select-none" onClick={() => navigate("/")}>
          <img src="/icon.png" className="size-9.5" alt="icon" />
        </h1>
        {shouldActive && (
          <Form {...searchForm}>
            <form onSubmit={searchForm.handleSubmit(handleSearch)} className="max-w-lg flex-1">
              <FormField
                control={searchForm.control}
                name="search"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-full flex gap-2">
                        <div className="relative flex-1 flex items-center justify-end">
                          <Input {...field} autoComplete="off" placeholder="O que você está procurando?" className="border-b-0 bg-zinc-100 placeholder:text-zinc-500 rounded text-sm placeholder:font-normal pr-10" />
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
                        <Select onValueChange={setFilter} defaultValue={filter}>
                          <SelectTrigger className="w-9 p-0 justify-center [&>span]:sr-only">
                            <ListFilter />
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem defaultChecked className="mb-1" value="clear">
                              Sem Filtro
                            </SelectItem>
                            {categories.map((category, index) => (
                              <SelectItem key={index} value={category} className="capitalize">
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
          <div className="flex items-center sm:gap-4 gap-1">
            <Button size="icon" variant="ghost" className="cursor-pointer size-9 hover:bg-transparent" onClick={() => navigate("/favorites")}>
              <Heart className="size-5.5" />
            </Button>
            <Button size="icon" variant="ghost" className="cursor-pointer size-9 hover:bg-transparent" onClick={() => navigate("/cart")}>
              <ShoppingCart className="size-5.5" />
            </Button>
            <div className="size-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="flex size-8.5 cursor-pointer">
                    <AvatarImage className="rounded-full" src={client?.clientPicture?.url} />
                    <AvatarFallback>
                      <div className="size-8.5 flex items-center justify-center bg-primary-theme rounded-full">
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
                    {logoutIsLoading ? <Spinner className="size-3.5 border-2 border-t-black" /> : <LogOut />}
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
