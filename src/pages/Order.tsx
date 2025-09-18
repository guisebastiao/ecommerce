import type { OrderQueryParams } from "@/types/orderTypes";
import ProductOrder from "@/components/ProductOrder";
import { Pagination } from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import { findAllOrders } from "@/hooks/useOrder";
import { Spinner } from "@/components/Spinner";

export const Order = () => {
  const [searchParams] = useSearchParams({
    offset: "1",
    limit: "20",
  });

  const params = Object.fromEntries(searchParams.entries()) as {
    [K in keyof OrderQueryParams]: string;
  };

  const { data, isLoading } = findAllOrders(params);

  return (
    <section className="w-full flex flex-col gap-3 py-4 md:px-6 px-4">
      <header className="flex justify-between items-center py-3">
        <h2 className="font-medium text-lg">Meus Pedidos</h2>
      </header>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner className="size-5 border-t-black" />
        </div>
      ) : !data || data.data.paging.totalPages <= 0 ? (
        <div className="w-full flex flex-col items-center space-y-2">
          <h3 className="font-bold text-center">Nenhum pedido encontrado</h3>
          <p className="text-sm text-center">Faça sua primeira compra...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 min-h-[calc(100vh-80px)]">
          {data.data.items.map((order) => (
            <ProductOrder key={order.orderId} order={order} />
          ))}
        </div>
      )}
      {!isLoading && data && data.data.paging.totalPages > 0 && <Pagination paging={data.data.paging} />}
    </section>
  );
};
