import { ProductCartItem } from "@/components/ProductCartItem";
import { findAllCartItems } from "@/hooks/useCart";
import { createPayment } from "@/hooks/useOrder";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/Spinner";
import { useEffect } from "react";

const Favorite = () => {
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
    <section className="w-full flex flex-col gap-4 py-4 md:px-6 px-3">
      <header className="flex justify-between items-center py-2">
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
        <div className="flex flex-col gap-5">
          <div className="flex w-full flex-col items-center gap-5">
            <div className="w-full h-16 shadow-[0_0_10px_rgba(230,230,232,0.5)] flex justify-between items-center px-5">
              <span className="text-[15px] w-[calc(100%-128px-224px)] text-left">Produto</span>
              <span className="text-[15px] w-32 text-center">Preço</span>
              <span className="text-[15px] w-56 text-center">Quantidade</span>
            </div>
            {data.data.cartItems.map((cartItem) => (
              <ProductCartItem key={cartItem.cartItemId} cartItem={cartItem} />
            ))}
          </div>
          <div className="w-full h-full py-5 rounded space-y-2">
            <div className="flex items-center justify-between border-b border-zinc-400 h-11 px-1">
              <span className="text-[15px]">SubTotal</span>
              <span className="text-[15px]">{currencyFormat(data.data.subtotal)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-400 h-11 px-1">
              <span className="text-[15px]">Descontos</span>
              <span className="text-[15px]">{currencyFormat(data.data.totalDiscounts)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-400 h-11 px-1">
              <span className="text-[15px]">Frete</span>
              <span className="text-[15px]">Gratuito</span>
            </div>
            <div className="flex items-center justify-between h-11 px-1">
              <span className="text-[15px] font-bold">Total</span>
              <span className="text-[15px] font-bold">{currencyFormat(data.data.total)}</span>
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

export default Favorite;
