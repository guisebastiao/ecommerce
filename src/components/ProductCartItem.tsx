import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { UpdateCartRequestDTO } from "@/schemas/cartSchema";
import { removeCartItem, updateQuantity } from "@/hooks/useCart";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { CartItemDTO } from "@/types/cartTypes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Spinner } from "./Spinner";
import { Input } from "./ui/input";

export interface ProductCartItemProps {
  cartItem: CartItemDTO;
}

export const ProductCartItem = ({ cartItem }: ProductCartItemProps) => {
  const [quantity, setQuantity] = useState(String(cartItem.quantity));
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: updateProductQuantity, isPending: isPendingProductQuantity } = updateQuantity();
  const { mutate: removeProductCartItem, isPending: isPendingRemoveCartItem, isSuccess } = removeCartItem();

  const navegate = useNavigate();

  useEffect(() => {
    setQuantity(String(cartItem.quantity));
  }, [cartItem.quantity]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

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
    if (cartItem.quantity <= 1) {
      setIsOpen(true);
      return;
    }

    const data: UpdateCartRequestDTO = { quantity: cartItem.quantity - 1 };
    updateProductQuantity({ cartItemId: cartItem.cartItemId, data });
  };

  const handleRemoveCartItem = () => {
    removeProductCartItem({ cartItemId: cartItem.cartItemId });
    setIsOpen(false);
  };

  return (
    <article className="w-full h-24 rounded-md flex items-center sm:justify-start justify-between gap-3 px-3 cursor-pointer overflow-hidden border" onClick={handleNavigateToProduct}>
      <div className="flex sm:w-[calc(100%-90px-72px-24px-24px)] justify-start items-center">
        <div className="size-18 flex-shrink-0 relative rounded">
          <img src={cartItem.product.productPictures[0].url} className="absolute size-full object-contain rounded bg-transparent mix-blend-multiply p-2" alt="product-picture" />
        </div>
        <span className="flex-1 text-[15px] font-medium truncate sm:block hidden">{cartItem.product.name}</span>
      </div>
      <div className="flex items-center justify-center px-3">
        {cartItem.product.price ? (
          <div className="flex gap-1 items-center">
            <span className="text-[15px] text-primary-theme">{cartItem.product.price}</span>
            <span className="text-xs line-through">{currencyFormat(cartItem.product.originalPrice)}</span>
          </div>
        ) : (
          <span className="text-[15px]">{currencyFormat(cartItem.product.originalPrice)}</span>
        )}
      </div>
      <div className="flex items-center justify-center px-3">
        <div className="relative flex items-center cursor-default" onClick={(e) => e.stopPropagation()}>
          <Input
            disabled={true}
            type="number"
            className={twMerge("w-[72px] h-[44px] border rounded disabled:opacity-100 border-zinc-400 pl-4 pr-6", isPendingProductQuantity && "border-zinc-200 text-zinc-400")}
            value={quantity}
          />
          <div className="absolute right-1 flex flex-col">
            <button disabled={isPendingProductQuantity} className="size-4 cursor-pointer hover:bg-zinc-100 hover:border flex justify-center items-center rounded" onClick={handleAddMore}>
              <ChevronUp className={twMerge("size-3.5", isPendingProductQuantity && "stroke-zinc-400")} />
            </button>
            <button disabled={isPendingProductQuantity} className="size-4 cursor-pointer hover:bg-zinc-100 hover:border flex justify-center items-center rounded" onClick={handleAddLess}>
              <ChevronDown className={twMerge("size-3.5", isPendingProductQuantity && "stroke-zinc-400")} />
            </button>
          </div>
        </div>
      </div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Produto do Carrinho</AlertDialogTitle>
            <AlertDialogDescription>Você tem certeza que deseja remover esse produto do carrinho?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveCartItem} disabled={isPendingRemoveCartItem}>
              {isPendingRemoveCartItem && <Spinner className="size-5 border-t-white" />}
              <span>Remover</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </article>
  );
};
