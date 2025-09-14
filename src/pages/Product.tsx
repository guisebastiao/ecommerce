import { addFavorite, removeFavorite } from "@/hooks/useFavorite";
import { Heart, Star, TruckElectric, Undo2 } from "lucide-react";
import { ProductDetail } from "@/components/ProductDetail";
import { findProductById } from "@/hooks/useProduct";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Carousel, CarouselContent, CarouselDots, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

export const Product = () => {
  const { productId } = useParams();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading } = findProductById({ productId: productId! });

  const { mutate: mutateAddFavorite, isPending: addFavoriteIsPending } = addFavorite();
  const { mutate: mutateRemoveFavorite, isPending: removeFavoriteIsPending } = removeFavorite();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedImage(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleUpdateCarousel = ({ index }: { index: number }) => {
    api?.scrollTo(index);
  };

  const currencyFormat = (value: number) => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "brl",
    }).format(value);
  };

  const handleAddFavorite = () => {
    if (!data) return;
    mutateAddFavorite({ productId: data.data.productId });
  };

  const handleRemoveFavorite = () => {
    if (!data) return;
    mutateRemoveFavorite({ productId: data.data.productId });
  };

  return (
    <section className="w-full flex flex-col gap-6 py-4 px-3 md:px-6">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner className="size-5 border-t-black" />
        </div>
      ) : !data ? (
        <h1 className="text-lg font-semibold">Produto não encontrado</h1>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex w-full h-[640px] lg:max-w-[900px] gap-4">
              <div className="hidden sm:flex md:w-[175px] w-24 h-full overflow-y-auto flex-col gap-2 pr-1">
                {data.data.productPictures.map((image, index) => (
                  <img
                    key={image.productPictureId}
                    src={image.url}
                    alt={"image-" + index}
                    onClick={() => handleUpdateCarousel({ index })}
                    className={twMerge(
                      "w-full md:h-36 h-24 bg-accent object-contain rounded border-[3px] border-transparent transition duration-500 mix-blend-multiply cursor-pointer p-2",
                      selectedImage === index && "border-zinc-500"
                    )}
                  />
                ))}
              </div>
              <div className="flex-1 h-full">
                <Carousel className="w-full h-full rounded bg-accent flex justify-center" setApi={setApi} opts={{ loop: true }}>
                  <CarouselContent className="h-full">
                    {data.data.productPictures.map((image, key) => (
                      <CarouselItem key={key} className="relative h-full flex items-center justify-center rounded bg-accent">
                        <img src={image.url} alt="banner-image" className="w-full h-full object-contain rounded p-2 bg-transparent mix-blend-multiply" />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselDots />
                </Carousel>
              </div>
            </div>
            <div className="flex flex-col gap-4 min-w-96 flex-1">
              <h1 className="text-xl font-semibold">{data.data.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) =>
                    Math.round(data.data.reviewRating!) <= index ? <Star key={index} className="size-4 fill-zinc-300 stroke-0" /> : <Star key={index} className="size-4 fill-yellow-400 stroke-0" />
                  )}
                </div>
                <span className="text-sm tracking-wider text-zinc-500">({data.data.totalReviews} avaliações)</span>
                <span className="text-sm">|</span>
                {data.data.available ? <span className="text-sm text-fluorescent">Em estoque</span> : <span className="text-sm text-red-600">Sem estoque</span>}
              </div>
              {data.data.price ? (
                <div className="space-x-2">
                  <span className="text-2xl text-primary-theme">{currencyFormat(data.data.price)}</span>
                  <span className="text-xl line-through text-zinc-400">{currencyFormat(data.data.originalPrice)}</span>
                </div>
              ) : (
                <span className="text-2xl">{currencyFormat(data.data.originalPrice)}</span>
              )}
              <p className="text-sm text-justify">{data.data.description}</p>
              <Separator className="my-3 bg-zinc-400" />
              <div className="flex w-full gap-2">
                <Button className="flex-1 bg-primary-theme hover:bg-primary-theme-hover cursor-pointer">Adicionar ao Carrinho</Button>
                <Button
                  size="icon"
                  variant="outline"
                  className={twMerge("border border-zinc-500 cursor-pointer", data.data.isFavorite && "border-primary-theme")}
                  onClick={() => (data.data.isFavorite ? handleRemoveFavorite() : handleAddFavorite())}>
                  {addFavoriteIsPending || removeFavoriteIsPending ? (
                    <Spinner className="size-4 border-t-black" />
                  ) : (
                    <Heart className={twMerge("size-5", data.data.isFavorite && "fill-primary-theme stroke-primary-theme")} />
                  )}
                </Button>
              </div>
              <div className="border border-zinc-400 rounded divide-y divide-zinc-400">
                <div className="flex gap-3 p-3">
                  <TruckElectric className="size-10 stroke-1" />
                  <div>
                    <p className="font-medium">Entrega Rápida</p>
                    <span className="text-[13px]">Insira seu código postal para disponibilidade de entrega</span>
                  </div>
                </div>
                <div className="flex gap-3 p-3">
                  <Undo2 className="size-10 stroke-1" />
                  <div>
                    <p className="font-medium">Entrega de Devolução</p>
                    <span className="text-[13px]">Devoluções com entrega gratuita em 30 dias</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetail product={data.data} />
        </>
      )}
    </section>
  );
};
