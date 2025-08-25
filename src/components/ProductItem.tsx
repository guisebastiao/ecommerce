import type { ProductDTO } from "@/types/productTypes";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { useState } from "react";

export interface ProductItemProps {
  product: ProductDTO;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <article
      className="relative h-[350px] overflow-hidden rounded cursor-pointer border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigateToProduct}
    >
      <div className="relative w-full h-[250px] bg-accent rounded">
        <Button
          size="icon"
          variant="outline"
          className="absolute top-2 right-2 size-8 rounded-full z-40 cursor-pointer"
        >
          <Heart
            className={twMerge(
              product.isFavorite && "stroke-primary-theme fill-primary-theme"
            )}
          />
        </Button>
        <img
          src={product.productPictures[0].url}
          className="absolute size-full object-contain rounded bg-transparent mix-blend-multiply p-3"
          alt="product-picture"
        />
      </div>
      <div className="flex flex-col gap-1 px-1.5">
        <p className="text-base font-medium line-clamp-1 mt-1.5">
          {product.name}
        </p>
        <div className="flex gap-2 items-center">
          <span className="text-sm font-semibold text-primary-theme">
            {currencyFormat(product.originalPrice)}
          </span>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) =>
              reviewAverage <= index ? (
                <Star
                  key={index}
                  className="size-4 fill-zinc-300 stroke-0"
                />
              ) : (
                <Star
                  key={index}
                  className="size-4 fill-yellow-400 stroke-0"
                />
              )
            )}
          </div>
          <span className="text-sm tracking-wider text-zinc-500">
            ({product.totalReviews})
          </span>
        </div>
      </div>
      <Button
        className={twMerge(
          "absolute -bottom-9 left-0 w-full rounded cursor-pointer",
          isHovered && "bottom-0"
        )}
      >
        Adicionar no Carrinho
      </Button>
    </article>
  );
};
