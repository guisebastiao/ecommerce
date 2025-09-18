import { addFavorite, removeFavorite } from "@/hooks/useFavorite";
import type { ProductDTO } from "@/types/productTypes";
import { addProductToCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";
import { useState } from "react";

export interface ProductItemProps {
  product: ProductDTO;
  blockButtonAddToCart?: boolean;
}

export const ProductItem = ({ product, blockButtonAddToCart = false }: ProductItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const { mutate: mutateAddProductToCart, isPending: isPendingAddProductToCart } = addProductToCart();
  const { mutate: addProductFavorite, isPending: isPendingAddFavorite } = addFavorite();
  const { mutate: removeProductFavorite, isPending: isPendingRemoveFavorite } = removeFavorite();

  const navegate = useNavigate();

  const currencyFormat = (value: number) => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "brl",
    }).format(value);
  };

  const reviewAverage = Math.round(product.reviewRating);

  const handleNavigateToProduct = () => {
    navegate(`/product/${product.productId}`);
  };

  const handleAddProductToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutateAddProductToCart({ productId: product.productId, quantity: 1 });
  };

  const handleAddFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    addProductFavorite({ productId: product.productId });
  };

  const handleRemoveFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeProductFavorite({ productId: product.productId });
  };

  return (
    <article className="relative h-[360px] overflow-hidden rounded cursor-pointer border" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleNavigateToProduct}>
      <button
        className={twMerge("absolute right-2 top-2 flex justify-center items-center size-9 bg-white rounded-full border z-40 cursor-pointer hover:scale-105 opacity-0 transition-all", isHovered && "opacity-100")}
        disabled={isPendingAddFavorite || isPendingRemoveFavorite}
        onClick={(e) => {
          product.isFavorite ? handleRemoveFavorite(e) : handleAddFavorite(e);
        }}>
        <Heart className={twMerge("size-5 transition-all", product.isFavorite ? "stroke-primary-theme fill-primary-theme" : "fill-transparent")} />
      </button>
      <div className="relative w-full h-[250px] bg-accent rounded">
        <img src={product.productPictures?.[0]?.url} className="absolute size-full object-contain rounded bg-transparent mix-blend-multiply p-3" alt="product-picture" />
      </div>
      <div className="flex flex-col gap-1 px-1.5">
        <p className="text-base font-medium line-clamp-1 mt-1.5">{product.name}</p>
        <div className="flex gap-2 items-center">
          <div className="space-x-1">
            {product.price && <span className="text-sm font-semibold text-primary-theme">{currencyFormat(product.price)}</span>}
            <span className={twMerge("text-sm font-semibold text-primary-theme", product.price && "line-through text-zinc-400 text-xs font-normal")}>{currencyFormat(product.originalPrice)}</span>
          </div>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (reviewAverage <= index ? <Star key={index} className="size-4 fill-zinc-300 stroke-0" /> : <Star key={index} className="size-4 fill-yellow-400 stroke-0" />))}
          </div>
          <span className="text-sm tracking-wider text-zinc-500">({product.totalReviews})</span>
        </div>
      </div>
      <Button
        className={twMerge("absolute -bottom-9 left-0 w-full rounded cursor-pointer", isHovered && "bottom-0", blockButtonAddToCart && "bottom-0")}
        disabled={isPendingAddProductToCart}
        onClick={handleAddProductToCart}>
        {isPendingAddProductToCart && <Spinner className="size-5 border-t-white" />}
        Adicionar no Carrinho
      </Button>
    </article>
  );
};
