import type { ProductQueryParams } from "@/types/productTypes";
import { ProductItem } from "@/components/ProductItem";
import { findAllProducts } from "@/hooks/useProduct";
import { Pagination } from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@/components/Spinner";

export const Home = () => {
  const [searchParams] = useSearchParams({
    offset: "1",
    limit: "24",
  });

  const params = Object.fromEntries(searchParams.entries()) as {
    [K in keyof ProductQueryParams]: string;
  };

  const { data, isLoading } = findAllProducts(params);

  return (
    <section className="w-full flex flex-col gap-3 py-4 md:px-6 px-4 min-h-[calc(100vh-80px)]">
      <header className="flex justify-between items-center py-3">
        <h2 className="font-medium text-lg">Explorar Produtos</h2>
      </header>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner className="size-5 border-t-black" />
        </div>
      ) : !data || data.data.paging.totalPages <= 0 ? (
        <div className="w-full flex flex-col items-center space-y-2">
          <h3 className="font-bold text-center">Nenhum produto encontrado com esse critério de pesquisa</h3>
          <p className="text-sm text-center">Tente novamente com outro termo para busca...</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-2">
          {data.data.items.map((product) => (
            <ProductItem key={product.productId} product={product} />
          ))}
        </div>
      )}
      {!isLoading && data && data.data.paging.totalPages > 0 && <Pagination paging={data.data.paging} />}
    </section>
  );
};
