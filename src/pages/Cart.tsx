import { ProductCartItem } from "@/components/ProductCartItem";
import { NotepadText, ShoppingCart } from "lucide-react";
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
    <section className="w-full flex flex-col gap-3 py-4 md:px-6 px-4 min-h-[calc(100vh-80px)]">
      <header className="flex justify-between items-center py-3">
        <h2 className="font-medium text-lg">Carrinho</h2>
      </header>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner className="size-5 border-t-black" />
        </div>
      ) : !data || data.data.cartItems.length <= 0 ? (
        <div className="w-full border rounded-md p-8">
          <div className="flex flex-col items-center space-y-2">
            <h3 className="font-bold text-center">Nenhum produto encontrado em seu carrinho</h3>
            <p className="text-sm text-center text-gray-500">Adicione produtos em seu carrinho...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="w-full border rounded-md overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-zinc-50 rounded-full flex items-center justify-center border">
                  <ShoppingCart className="size-4 text-gray-600" />
                </div>
                <h2 className="text-base font-medium">Informações do Cartão</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {data.data.cartItems.map((cartItem) => (
                <ProductCartItem key={cartItem.cartItemId} cartItem={cartItem} />
              ))}
            </div>
          </div>
          <div className="w-full border rounded-md overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-zinc-50 rounded-full flex items-center justify-center border">
                  <NotepadText className="size-4 text-gray-600" />
                </div>
                <h2 className="text-base font-medium">Resumo do Pedido</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-[15px]">SubTotal</span>
                <span className="text-[15px]">{currencyFormat(data.data.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-[15px]">Descontos</span>
                <span className="text-[15px]">{currencyFormat(data.data.totalDiscounts)}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-[15px]">Frete</span>
                <span className="text-[15px] text-green-600">Gratuito</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-[15px] font-bold">Total</span>
                <span className="text-[15px] font-bold">{currencyFormat(data.data.total)}</span>
              </div>
            </div>
          </div>
          <Button className="bg-primary-theme hover:bg-primary-theme-hover w-full" onClick={handlePayment} disabled={isPending}>
            {isPending && <Spinner className="size-4 border-t-white" />}
            <span>Ir para o pagamento</span>
          </Button>
        </div>
      )}
    </section>
  );
};
