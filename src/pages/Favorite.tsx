import type { FavoriteQueryParams } from "@/types/favoriteTypes";
import { findAllFavorites } from "@/hooks/useFavorite";
import { ProductItem } from "@/components/ProductItem";
import { Pagination } from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@/components/Spinner";

export const Favorite = () => {
  const [searchParams] = useSearchParams({
    offset: "1",
    limit: "24",
  });

  const params = Object.fromEntries(searchParams.entries()) as {
    [K in keyof FavoriteQueryParams]: string;
  };

  const { data, isLoading } = findAllFavorites(params);

  return (
    <section className="w-full flex flex-col gap-3 py-4 md:px-6 px-4">
      <header className="flex justify-between items-center py-3">
        <h2 className="font-medium text-lg">Favoritos</h2>
      </header>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner className="size-5 border-t-black" />
        </div>
      ) : !data || data.data.paging.totalItems <= 0 ? (
        <div className="w-full flex flex-col items-center space-y-2">
          <h3 className="font-bold text-center">Nenhum produto encontrado na lista de favoritos</h3>
          <p className="text-sm text-center">Adicione produtos na sua lista de favoritos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-2 min-h-[calc(100vh-80px-190px+45px)]">
          {data.data.items.map((product) => (
            <ProductItem key={product.productId} product={product} blockButtonAddToCart={true} />
          ))}
        </div>
      )}
      {!isLoading && data && data.data.paging.totalPages > 0 && <Pagination paging={data.data.paging} />}
    </section>
  );
};
