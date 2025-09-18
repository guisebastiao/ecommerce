import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createReview, deleteReview } from "@/hooks/useReview";
import { Star, UserRoundX, UserStar } from "lucide-react";
import type { ProductDTO } from "@/types/productTypes";
import { useContextAuth } from "@/context/authContext";
import { Spinner } from "@/components/Spinner";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { useState } from "react";

interface ReviewProps {
  product: ProductDTO;
}

export const Review = ({ product }: ReviewProps) => {
  const { isAuthenticated } = useContextAuth();

  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(0);

  const totalStars = 5;

  const { mutate: mutateCreateReview, isPending: pendingCreateReview } = createReview();
  const { mutate: mutateDeleteReview } = deleteReview();

  const handleCreateReview = () => {
    if (selected <= 0) return;
    mutateCreateReview({ productId: product.productId, data: { rating: selected } });
  };

  const handleDeleteReview = () => {
    if (!product.alreadyReviewed) return;
    mutateDeleteReview({ productId: product.productId });
  };

  return (
    <div>
      <h3 className="text-xl font-bold py-3">Avaliações</h3>
      <div className="flex flex-col p-2.5 gap-2.5">
        <div className="flex justify-between items-center">
          <div className="flex gap-2.5">
            <h4 className="text-4xl text-primary-theme font-black">{product.reviewRating.toFixed(1)}</h4>
            <div className="flex flex-col justify-center items-start gap-1">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, index) =>
                  Math.round(product.reviewRating) <= index ? <Star key={index} className="size-5 fill-zinc-300 stroke-0" /> : <Star key={index} className="size-5 fill-yellow-400 stroke-0" />
                )}
              </div>
              <span className="text-xs pl-1">
                {product.totalReviews} {product.totalReviews === 1 ? "Avaliação" : "Avaliações"}
              </span>
            </div>
          </div>
          {isAuthenticated &&
            (product.alreadyReviewed ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-primary-theme text-white hover:bg-primary-theme-hover">
                    <UserRoundX />
                    <span>Excluir Avaliação</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir Avaliação</AlertDialogTitle>
                    <AlertDialogDescription>Você realmente deseja excluir sua avaliação deste produto? Esta ação não pode ser desfeita.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteReview}>Excluir</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary-theme text-white hover:bg-primary-theme-hover">
                    <UserStar />
                    <span>Avaliar Produto</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Avaliar Produto</DialogTitle>
                    <DialogDescription>Avalie este produto! Sua opinião é importante para outros clientes. Selecione o número de estrelas que representa sua experiência com esse produto.</DialogDescription>
                  </DialogHeader>
                  <div className="flex w-full justify-center items-center py-3">
                    {Array.from({ length: totalStars }, (_, index) => {
                      const starIndex = index + 1;
                      const isFilled = (hovered ?? selected) >= starIndex;
                      return (
                        <div
                          key={starIndex}
                          onMouseEnter={() => setHovered(starIndex)}
                          onMouseLeave={() => setHovered(null)}
                          onClick={() => setSelected(starIndex)}
                          className={twMerge("cursor-pointer", isFilled ? "fill-amber-300 stroke-amber-300" : "stroke-zinc-400 fill-transparent")}
                          role="button"
                          tabIndex={0}>
                          {isFilled ? <Star className="fill-amber-300 stroke-amber-300" /> : <Star className="stroke-zinc-400 fill-transparent" />}
                        </div>
                      );
                    })}
                  </div>
                  <Button className="w-full" onClick={handleCreateReview}>
                    {pendingCreateReview && <Spinner className="size-4 border-t-white" />}
                    <span>Avaliar</span>
                  </Button>
                </DialogContent>
              </Dialog>
            ))}
        </div>
      </div>
    </div>
  );
};
