import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowRight, BriefcaseConveyorBelt, CircleDollarSign, CreditCard, Package, PackageCheck, PackageX, ShoppingBasket, Truck } from "lucide-react";
import { OrderStatus, PaymentMethod, type OrderDTO } from "@/types/orderTypes";
import { getEnumValue } from "@/utils/getEnumString";
import { useNavigate } from "react-router-dom";
import { cancelOrder } from "@/hooks/useOrder";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";

interface ProductOrderProps {
  order: OrderDTO;
}

const ProductOrder = ({ order }: ProductOrderProps) => {
  const navigate = useNavigate();

  const { mutate, isPending } = cancelOrder();

  const currencyFormat = (value: number) => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "brl",
    }).format(value);
  };

  const handleCancelOrder = () => {
    mutate({ orderId: order.orderId });
  };

  return (
    <div className="overflow-hidden rounded shadow-[0_0_10px_rgba(230,230,232,0.5)] p-5 border">
      <div className="flex items-center">
        <div className="w-full flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <Package className="size-4" />
            <span className="text-sm font-semibold">Número do Pedido:</span>
            <span className="text-[13px] font-medium text-zinc-700">{order.orderNumber}</span>
          </div>
          <div className="flex items-center gap-1">
            <CreditCard className="size-4" />
            <span className="text-sm font-semibold">Métado de Pagamento:</span>
            <span className="text-[13px] font-medium text-zinc-700">{getEnumValue(PaymentMethod, order.paymentMethod)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Truck className="size-4" />
            <span className="text-sm font-semibold">Status do Pedido:</span>
            <span className="text-[13px] font-medium text-zinc-700">{getEnumValue(OrderStatus, order.orderStatus)}</span>
          </div>
          <div className="flex items-center gap-1">
            <CircleDollarSign className="size-4" />
            <span className="text-sm font-semibold">Total:</span>
            <span className="text-[13px] font-medium text-zinc-700">{currencyFormat(order.total)}</span>
          </div>
        </div>
        {order.orderStatus === "PENDING_PAYMENT" && (
          <div className="flex gap-1">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="size-8" size="icon">
                  {isPending ? <Spinner className="size-4 border-t-white" /> : <PackageX />}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar Compra</AlertDialogTitle>
                  <AlertDialogDescription>Você tem certeza que deseja cancelar essa compra?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Não</AlertDialogCancel>
                  <AlertDialogAction onClick={handleCancelOrder}>Sim</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button className="size-8" size="icon" onClick={() => navigate(`/payment`, { state: order })}>
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 py-4">
        {order.items.map(({ product, quantity, orderItemId }) => (
          <div key={orderItemId} className="flex w-full gap-3 cursor-pointer" onClick={() => navigate(`/product/${product.productId}`)}>
            <div className="size-18 flex-shrink-0 relative rounded">
              <img src={product.productPictures[0].url} className="absolute size-full object-contain rounded bg-transparent mix-blend-multiply p-2" alt="product-picture" />
            </div>
            <div className="flex flex-col justify-center gap-2 w-[calc(100%-10.5rem)]">
              <span className="text-[15px] font-medium truncate">{product.name}</span>
              <span className="text-sm font-medium text-zinc-700">Quantidade: {quantity}</span>
            </div>
            <span className="w-42 text-right text-sm font-semibold">{currencyFormat(product.originalPrice)}</span>
          </div>
        ))}
      </div>
      {order.orderStatus === "PAID" && (
        <div className="w-full flex items-center sm:flex-row flex-col gap-5 px-8 py-4">
          <div className="w-24 flex flex-col items-center justify-center">
            <ShoppingBasket className="stroke-primary-theme" />
            <span className="text-[11px] font-medium text-center">Pedido recebido</span>
          </div>
          <div className="sm:w-full sm:h-0.5 w-0.5 h-10 bg-primary-theme" />
          <div className="w-24 flex flex-col items-center justify-center">
            <BriefcaseConveyorBelt className="stroke-primary-theme" />
            <span className="text-[11px] font-medium text-center">Enviada para a transportadora</span>
          </div>
          <div className="sm:w-full sm:h-0.5 w-0.5 h-10 bg-zinc-400" />
          <div className="w-24 flex flex-col items-center justify-center">
            <Package className="stroke-zinc-400" />
            <span className="text-[11px] font-medium text-center text-zinc-400">Recebida pela transportadora</span>
          </div>
          <div className="sm:w-full sm:h-0.5 w-0.5 h-10 bg-zinc-400" />
          <div className="w-24 flex flex-col items-center justify-center">
            <Truck className="stroke-zinc-400" />
            <span className="text-[11px] font-medium text-center text-zinc-400">Mercadoria em trânsito</span>
          </div>
          <div className="sm:w-full sm:h-0.5 w-0.5 h-10 bg-zinc-400" />
          <div className="w-24 flex flex-col items-center justify-center">
            <PackageCheck className="stroke-zinc-400" />
            <span className="text-[11px] font-medium text-center text-zinc-400">Pedido entrege</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOrder;
