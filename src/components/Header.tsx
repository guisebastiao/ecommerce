import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Bolt, LogOut, Package, Search, User, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchFormSchema } from "@/schemas/searchSchema";
import { useContextAuth } from "@/context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const { isAuthenticated } = useContextAuth();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchForm = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: searchParams.get("search") ?? "",
    },
  });

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

  const handleLogout = () => {
    console.log("Logout...");
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-center border-b h-20 z-50 bg-white">
      <div className="max-w-6xl w-full h-full flex justify-between items-center px-2 sm:gap-5 gap-3">
        <h1
          className="text-xl sm:text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Ecommerce
        </h1>
        <Form {...searchForm}>
          <form
            onSubmit={searchForm.handleSubmit(handleSearch)}
            className="max-w-lg w-full"
          >
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
                        <Button
                          type="button"
                          size="icon"
                          variant="outline"
                          className="absolute z-10 right-2 size-6 rounded cursor-pointer"
                          onClick={handleClearQueriesParams}
                        >
                          <X className=" size-5 text-zinc-800" />
                        </Button>
                      ) : (
                        <Search className="absolute z-10 size-5 text-zinc-800 right-2" />
                      )}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        {!isAuthenticated && (
          <Button onClick={() => navigate("/sign-in")}>Entrar</Button>
        )}
        {isAuthenticated && (
          <div className="sm:size-10 size-9">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="flex sm:size-10 size-9 cursor-pointer">
                  <AvatarImage
                    className="rounded-full"
                    // src={"https://avatars.githubusercontent.com/u/133043033"}
                    src={""}
                  />
                  <AvatarFallback>
                    <div className="sm:size-10 size-9 flex items-center justify-center bg-primary-theme rounded-full">
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
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};
