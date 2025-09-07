import { CreateReview } from "@/components/CreateReview";
import type { ProductDTO } from "@/types/productTypes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProductDetailProps {
  product: ProductDTO;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold">Fazer Avaliação</h3>
      <p className="pl-4 text-sm max-w-[500px]">Sua avaliação contribui diretamente para refletir a qualidade percebida do produto em aspectos como desempenho, preço e usabilidade.</p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary-theme hover:bg-primary-theme-hover cursor-pointer ml-4">
            <span>Avaliar Produto</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Avaliar Produto</DialogTitle>
            <DialogDescription>Escolha entre 1 a 5 estrelas para avaliar esse produto</DialogDescription>
          </DialogHeader>
          <CreateReview />
        </DialogContent>
      </Dialog>
      <h3 className="text-xl font-bold">Média de Avaliação</h3>
      <div className="flex items-end gap-1 pl-4">
        <p className="text-5xl font-extrabold text-amber-400">{product.reviewRating.toFixed(1)}</p>
        <span className="text-xs mb-1 tracking-wide">({product.totalReviews} avaliações)</span>
      </div>
      <h3 className="text-xl font-bold">Comentários</h3>
    </div>
  );
};
