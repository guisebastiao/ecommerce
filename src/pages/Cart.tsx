import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductCartItem } from "@/components/ProductCartItem";
import type { CartQueryParams } from "@/types/cartTypes";
import { Pagination } from "@/components/Pagination";
import { findAllCartItems } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";

const Favorite = () => {
  const [searchParams] = useSearchParams({
    offset: "1",
    limit: "20",
  });

  const navigate = useNavigate();

  const params = Object.fromEntries(searchParams.entries()) as {
    [K in keyof CartQueryParams]: string;
  };

  const { data, isLoading } = findAllCartItems(params);

  return (
    <section className="w-full flex flex-col gap-6 py-4 md:px-6 px-3">
      <header className="flex justify-between items-center py-5">
        <h2 className="font-medium text-lg">
          Carrinho <span className="text-base font-normal">({data?.data.paging.totalItems})</span>
        </h2>
        <Button variant="outline" className="rounded border-zinc-400" onClick={() => navigate("/")}>
          Voltar para Início
        </Button>
      </header>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner className="size-5" />
        </div>
      ) : !data || data.data.paging.totalItems <= 0 ? (
        <div className="w-full flex flex-col items-center space-y-2">
          <h3 className="font-bold text-center">Nenhum produto encontrado em seu carrinho</h3>
          <p className="text-sm text-center">Adicione produtos em seu carrinho...</p>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center gap-5 min-h-[calc(100vh-80px-190px+45px)]">
          {data.data.items.map((cartItem) => (
            <ProductCartItem key={cartItem.cartItemId} cartItem={cartItem} />
          ))}
        </div>
      )}
      {!isLoading && data && data.data.paging.totalPages > 0 && <Pagination paging={data.data.paging} />}
    </section>
  );
};

export default Favorite;
