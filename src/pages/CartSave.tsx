import { ProductCartItem } from "@/components/ProductCartItem";
import { findAllCartItems } from "@/hooks/useCart";
import { createPayment } from "@/hooks/useOrder";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import { useEffect } from "react";

export const Cart = () => {
  const navigate = useNavigate();

  const { data, isLoading } = findAllCartItems();
  const { mutate, data: paymentData, isPending, isSuccess } = createPayment();

  useEffect(() => {
    if (isSuccess) {
      navigate("/payment", { state: paymentData.data });
    }
  }, [isSuccess]);

  const currencyFormat = (value: number) => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "brl",
    }).format(value);
  };

  const handlePayment = () => {
    mutate({ paymentMethod: "CARD" });
  };

  return (
    <section className="w-full flex flex-col gap-3 py-4 md:px-6 px-4">
      <header className="flex justify-between items-center py-3">
        <h2 className="font-medium text-lg">Carrinho</h2>
      </header>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner className="size-5 border-t-black" />
        </div>
      ) : !data || data.data.cartItems.length <= 0 ? (
        <div className="w-full flex flex-col items-center space-y-2">
          <h3 className="font-bold text-center">Nenhum produto encontrado em seu carrinho</h3>
          <p className="text-sm text-center">Adicione produtos em seu carrinho...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 min-h-[calc(100vh-80px)]">
          <div className="flex w-full flex-col items-center gap-5">
            <div className="w-full h-12 shadow-[0_0_10px_rgba(230,230,232,0.5)] flex justify-between items-center px-4 border rounded-md">
              <span className="text-[15px] w-[calc(100%-128px-144px)] text-left">Produto</span>
              <span className="text-[15px] w-32 text-center">Preço</span>
              <span className="text-[15px] w-36 text-center">Quantidade</span>
            </div>
            {data.data.cartItems.map((cartItem) => (
              <ProductCartItem key={cartItem.cartItemId} cartItem={cartItem} />
            ))}
          </div>
          <div className="w-full h-full py-5 rounded space-y-2">
            <div className="flex items-center justify-between border-b h-11 px-1">
              <span className="text-[15px] px-4">SubTotal</span>
              <span className="text-[15px] px-4">{currencyFormat(data.data.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between border-b h-11 px-1">
              <span className="text-[15px] px-4">Descontos</span>
              <span className="text-[15px] px-4">{currencyFormat(data.data.totalDiscounts)}</span>
            </div>
            <div className="flex items-center justify-between border-b h-11 px-1">
              <span className="text-[15px] px-4">Frete</span>
              <span className="text-[15px] px-4">Gratuito</span>
            </div>
            <div className="flex items-center justify-between h-11 px-1">
              <span className="text-[15px] font-bold px-4">Total</span>
              <span className="text-[15px] font-bold px-4">{currencyFormat(data.data.total)}</span>
            </div>
            <Button className="bg-primary-theme hover:bg-primary-theme-hover w-full mt-4" onClick={handlePayment} disabled={isPending}>
              {isPending && <Spinner className="size-4 border-t-white" />}
              <span>Ir para o pagamento</span>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};
