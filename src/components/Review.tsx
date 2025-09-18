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
    mutateCreateReview({
      productId: product.productId,
      data: { rating: selected },
    });
  };

  const handleDeleteReview = () => {
    if (!product.alreadyReviewed) return;
    mutateDeleteReview({ productId: product.productId });
  };

  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold">Avaliações</h3>
      <div className="flex justify-between items-center bg-zinc-50 rounded-md border p-5">
        <div className="flex gap-4 items-center">
          <h4 className="text-4xl font-black text-primary-theme">{product.reviewRating.toFixed(1)}</h4>
          <div className="flex flex-col gap-1">
            <div className="flex">
              {Array.from({ length: totalStars }).map((_, index) => (
                <Star key={index} className={twMerge("size-5", Math.round(product.reviewRating) > index ? "fill-yellow-400 text-yellow-400" : "fill-zinc-200 text-zinc-200")} />
              ))}
            </div>
            <span className="text-xs text-zinc-600">
              {product.totalReviews} {product.totalReviews === 1 ? "avaliação" : "avaliações"}
            </span>
          </div>
        </div>

        {isAuthenticated &&
          (product.alreadyReviewed ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-primary-theme text-white hover:bg-primary-theme-hover">
                  <UserRoundX className="mr-2" />
                  Excluir Avaliação
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir Avaliação</AlertDialogTitle>
                  <AlertDialogDescription>Tem certeza que deseja excluir sua avaliação? Essa ação não pode ser desfeita.</AlertDialogDescription>
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
                  <UserStar className="mr-2" />
                  Avaliar Produto
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Avaliar Produto</DialogTitle>
                  <DialogDescription>Sua opinião é importante. Selecione quantas estrelas esse produto merece.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-center py-4">
                  {Array.from({ length: totalStars }, (_, index) => {
                    const starIndex = index + 1;
                    const isFilled = (hovered ?? selected) >= starIndex;
                    return (
                      <button key={starIndex} onMouseEnter={() => setHovered(starIndex)} onMouseLeave={() => setHovered(null)} onClick={() => setSelected(starIndex)} className="cursor-pointer">
                        <Star className={twMerge("size-8 transition-colors", isFilled ? "fill-amber-400 text-amber-400" : "stroke-zinc-400 fill-transparent")} />
                      </button>
                    );
                  })}
                </div>
                <Button className="w-full bg-primary-theme hover:bg-primary-theme-hover" onClick={handleCreateReview} disabled={pendingCreateReview}>
                  {pendingCreateReview && <Spinner className="size-4 border-t-white mr-2" />}
                  Avaliar
                </Button>
              </DialogContent>
            </Dialog>
          ))}
      </div>
    </section>
  );
};
