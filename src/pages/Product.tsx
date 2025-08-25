import { Heart, Star, TruckElectric, Undo2 } from "lucide-react";
import { findProductById } from "@/hooks/useProduct";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ProductDetail } from "@/components/ProductDetail";

export const Product = () => {
  const { productId } = useParams();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading } = findProductById({ productId: productId! });

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

  return (
    <section className="w-full flex flex-col gap-6 py-4 md:px-6 px-3">
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner className="size-5" />
        </div>
      ) : !data ? (
        <h1>Produto Não encontrado</h1>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row h-auto lg:h-[540px] gap-6">
            <div className="flex w-full lg:max-w-[650px] gap-4">
              <div className="md:w-[175px] w-24 h-full overflow-y-auto flex flex-col gap-2">
                {data.data.productPictures.map((image, index) => (
                  <div
                    key={image.objectId}
                    className={twMerge(
                      "relative w-full md:h-36 h-24 bg-accent rounded cursor-pointer border-[3px] border-transparent transition duration-500",
                      selectedImage === index && "border-[3px] border-zinc-500"
                    )}
                    onClick={() => handleUpdateCarousel({ index })}
                  >
                    <img
                      src={image.url}
                      alt={`image-${index}`}
                      className="absolute size-full object-contain rounded bg-transparent mix-blend-multiply p-2"
                    />
                  </div>
                ))}
              </div>
              <Carousel
                className="flex-1 h-full rounded bg-accent flex justify-center"
                setApi={setApi}
                opts={{ loop: true }}
              >
                <CarouselContent className="h-full">
                  {data.data.productPictures.map((image, key) => (
                    <CarouselItem
                      key={key}
                      className="relative h-full flex items-center justify-center bg-accent rounded"
                    >
                      <img
                        src={image.url}
                        className="w-full h-full object-contain rounded bg-transparent mix-blend-multiply p-2"
                        alt="banner-image"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselDots />
              </Carousel>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-xl font-semibold">{data.data.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) =>
                    Math.round(data.data.reviewRating!) <= index ? (
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
                  ({data.data.totalReviews} avaliações)
                </span>
                <span className="text-sm">|</span>
                {data.data.available ? (
                  <span className="text-sm text-fluorescent">Em estoque</span>
                ) : (
                  <span className="text-sm text-red-600">Sem estoque</span>
                )}
              </div>
              <span className="text-2xl">
                {currencyFormat(data.data.originalPrice)}
              </span>
              <p className="text-sm">{data.data.description}</p>
              <Separator className="my-3 bg-zinc-400" />
              <div className="flex w-full gap-2">
                <Button className="w-[calc(100%-36px-8px)] bg-primary-theme hover:bg-primary-theme-hover cursor-pointer">
                  Adicionar ao Carrinho
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border border-zinc-500 cursor-pointer"
                >
                  <Heart className="size-5" />
                </Button>
              </div>
              <div className="border border-zinc-400 rounded">
                <div className="flex gap-3 p-3">
                  <TruckElectric className="size-10 stroke-1" />
                  <div>
                    <p className="font-medium">Entrega Rápida</p>
                    <span className="text-[13px]">
                      Insira seu código postal para disponibilidade de entrega
                    </span>
                  </div>
                </div>
                <Separator className="bg-zinc-400" />
                <div className="flex gap-3 p-3">
                  <Undo2 className="size-10 stroke-1" />
                  <div>
                    <p className="font-medium">Entrega de Devolução</p>
                    <span className="text-[13px]">
                      Devoluções com entrega gratuita em 30 dias
                    </span>
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
