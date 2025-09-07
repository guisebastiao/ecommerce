import type { UpdateCartRequestDTO } from "@/schemas/cartSchema";
import { removeCartItem, updateQuantity } from "@/hooks/useCart";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import type { CartItemDTO } from "@/types/cartTypes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Spinner } from "./Spinner";

export interface ProductCartItemProps {
  cartItem: CartItemDTO;
}

export const ProductCartItem = ({ cartItem }: ProductCartItemProps) => {
  const [quantity, setQuantity] = useState(String(cartItem.quantity));

  const { mutate: updateProductQuantity, isPending: isPendingProductQuantity } = updateQuantity();
  const { mutate: removeProductCartItem, isPending: isPendingRemoveCartItem } = removeCartItem();

  const navegate = useNavigate();

  useEffect(() => {
    setQuantity(String(cartItem.quantity));
  }, [cartItem.quantity]);

  const currencyFormat = (value: number) => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "brl",
    }).format(value);
  };

  const handleNavigateToProduct = () => {
    navegate(`/product/${cartItem.product.productId}`);
  };

  const handleAddMore = () => {
    const data: UpdateCartRequestDTO = { quantity: cartItem.quantity + 1 };
    updateProductQuantity({ cartItemId: cartItem.cartItemId, data });
  };

  const handleAddLess = () => {
    if (cartItem.quantity <= 1) return;
    const data: UpdateCartRequestDTO = { quantity: cartItem.quantity - 1 };
    updateProductQuantity({ cartItemId: cartItem.cartItemId, data });
  };

  const handleUpdateQuantity = () => {
    if (Number(quantity) < 1) return;
    const data: UpdateCartRequestDTO = { quantity: Number(quantity) };
    updateProductQuantity({ cartItemId: cartItem.cartItemId, data });
  };

  const handleRemoveCartItem = () => {
    removeProductCartItem({ cartItemId: cartItem.cartItemId });
  };

  return (
    <article className="w-full h-24 overflow-hidden rounded shadow-[0_0_10px_rgba(230,230,232,0.5)] flex items-center " onClick={handleNavigateToProduct}>
      <div className="w-[calc(100%/4)] flex items-center px-3">
        <div className="size-18 flex-shrink-0 relative rounded">
          <img src={cartItem.product.productPictures[0].url} className="absolute size-full object-contain rounded bg-transparent mix-blend-multiply p-2" alt="product-picture" />
        </div>
        <span className="flex-1 text-[15px] font-medium truncate">{cartItem.product.name}</span>
      </div>
      <div className="w-[calc(100%/4)] flex items-center justify-center px-3">
        <span className="text-[15px]">{currencyFormat(cartItem.product.originalPrice)}</span>
      </div>
      <div className="w-[calc(100%/4)] flex items-center justify-center px-3">
        <div className="relative flex items-center" onClick={(e) => e.stopPropagation()}>
          <Input
            disabled={isPendingProductQuantity}
            type="number"
            className="w-[72px] h-[44px] border border-zinc-400 rounded pl-4 pr-6"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            onBlur={() => {
              if (quantity === "" || Number(quantity) < 1) setQuantity("1");
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && handleUpdateQuantity();
            }}
          />
          <div className="absolute right-1 flex flex-col">
            <button disabled={isPendingProductQuantity} className="size-4 cursor-pointer hover:bg-zinc-100 hover:border flex justify-center items-center rounded" onClick={handleAddMore}>
              <ChevronUp className="size-3.5" />
            </button>
            <button disabled={isPendingProductQuantity || cartItem.quantity <= 1} className="size-4 cursor-pointer hover:bg-zinc-100 hover:border flex justify-center items-center rounded" onClick={handleAddLess}>
              <ChevronDown className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-[calc(100%/4)] flex items-center justify-center px-3">
        <span>{currencyFormat(cartItem.product.originalPrice * cartItem.quantity)}</span>
      </div>
      <div className="px-4" onClick={(e) => e.stopPropagation()}>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" className="size-8 rounded" variant="destructive" disabled={isPendingRemoveCartItem}>
              {isPendingRemoveCartItem ? <Spinner className="size-4 border-t-white" /> : <X />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remover Produto do Carrinho</AlertDialogTitle>
              <AlertDialogDescription>Você tem certeza que deseja remover esse produto do carrinho?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleRemoveCartItem}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </article>
  );
};
