import { Heart, Star, TruckElectric, Undo2, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { addFavorite, removeFavorite } from "@/hooks/useFavorite";
import { findProductById } from "@/hooks/useProduct";
import { Separator } from "@/components/ui/separator";
import { addProductToCart } from "@/hooks/useCart";
import { Comment } from "@/components/Comment";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { useParams } from "react-router-dom";
import { Review } from "@/components/Review";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const Product = () => {
  const { productId } = useParams();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);

  const { data, isLoading } = findProductById({ productId: productId! });

  const { mutate: mutateAddFavorite, isPending: addFavoriteIsPending } = addFavorite();
  const { mutate: mutateAddToCart, isPending: addToCartPending } = addProductToCart();
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

  useEffect(() => {
    if (data?.data.productPictures) {
      setImageLoaded(new Array(data.data.productPictures.length).fill(false));
    }
  }, [data]);

  const handleUpdateCarousel = ({ index }: { index: number }) => {
    api?.scrollTo(index);
    setSelectedImage(index);
  };

  const handlePrevImage = () => {
    if (!data) return;
    const prevIndex = selectedImage > 0 ? selectedImage - 1 : data.data.productPictures.length - 1;
    handleUpdateCarousel({ index: prevIndex });
  };

  const handleNextImage = () => {
    if (!data) return;
    const nextIndex = selectedImage < data.data.productPictures.length - 1 ? selectedImage + 1 : 0;
    handleUpdateCarousel({ index: nextIndex });
  };

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
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

  const handleAddToCart = () => {
    mutateAddToCart({ productId: productId!, quantity });
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const hasDiscount = data?.data.price && data?.data.price < data?.data.originalPrice;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-96">
          <Spinner className="size-8 border-t-black" />
        </div>
      ) : !data ? (
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-zinc-600">Produto não encontrado</h1>
          <p className="text-zinc-500 mt-2">O produto que você está procurando não foi encontrado</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div className="space-y-4">
              <div className="relative group">
                <div className="relative bg-zinc-50 rounded-xl overflow-hidden aspect-square">
                  <Carousel className="w-full h-full" setApi={setApi} opts={{ loop: true, align: "center" }}>
                    <CarouselContent className="h-full">
                      {data.data.productPictures.map((image, index) => (
                        <CarouselItem key={index} className="h-full flex items-center justify-center">
                          <div className="relative w-full h-full flex items-center justify-center p-4">
                            {!imageLoaded[index] && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Spinner className="size-8 border-t-zinc-400" />
                              </div>
                            )}
                            <img
                              src={image.url}
                              alt={`${data.data.name} - Imagem ${index + 1}`}
                              className="max-w-full max-h-full object-contain mix-blend-multiply transition-opacity duration-300"
                              style={{ opacity: imageLoaded[index] ? 1 : 0 }}
                              onLoad={() => handleImageLoad(index)}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                  {data.data.productPictures.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <ChevronLeft className="size-5" />
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <ChevronRight className="size-5" />
                      </button>
                    </>
                  )}
                  {data.data.productPictures.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {selectedImage + 1} / {data.data.productPictures.length}
                    </div>
                  )}
                </div>
                {data.data.productPictures.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto p-2">
                    {data.data.productPictures.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleUpdateCarousel({ index })}
                        className={twMerge(
                          "flex-shrink-0 size-20 rounded-lg overflow-hidden border-2 transition-all duration-200",
                          selectedImage === index ? "border-primary-theme shadow-lg scale-105" : "border-zinc-200 hover:border-zinc-300"
                        )}>
                        <img src={image.url} alt={`Miniatura ${index + 1}`} className="w-full h-full object-contain bg-zinc-50 mix-blend-multiply p-1" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-xl font-bold text-zinc-900 leading-tight">{data.data.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className={twMerge("size-4.5", Math.round(data.data.reviewRating!) > index ? "fill-yellow-400 text-yellow-400" : "fill-zinc-200 text-zinc-200")} />
                      ))}
                    </div>
                    <span className="text-sm text-zinc-600 font-medium">
                      ({data.data.totalReviews} {data.data.totalReviews === 1 ? "avaliação" : "avaliações"})
                    </span>
                  </div>
                  <div className="h-4 w-px bg-zinc-300" />
                  <div className="flex items-center gap-2">
                    <div className={twMerge("w-2 h-2 rounded-full", data.data.available ? "bg-green-500" : "bg-red-500")} />
                    <span className={twMerge("text-sm font-medium", data.data.available ? "text-green-600" : "text-red-600")}>{data.data.available ? "Em estoque" : "Sem estoque"}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {hasDiscount ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary-theme">{currencyFormat(data.data.price!)}</span>
                    <span className="text-xl text-zinc-400 line-through">{currencyFormat(data.data.originalPrice)}</span>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-md">-{Math.round((1 - data.data.price! / data.data.originalPrice) * 100)}%</span>
                  </div>
                ) : (
                  <span className="text-xl font-bold text-zinc-900">{currencyFormat(data.data.originalPrice)}</span>
                )}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-zinc-900">Descrição</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{data.data.description}</p>
              </div>
              <Separator className="bg-zinc-200" />
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button className="flex-1 bg-primary-theme hover:bg-primary-theme-hover" onClick={handleAddToCart} disabled={addToCartPending || !data.data.available}>
                    {addToCartPending && <Spinner className="size-4 border-t-white mr-2" />}
                    <span>Adicionar ao Carrinho</span>
                  </Button>
                  <div className="flex items-center border border-zinc-300 rounded-md">
                    <button onClick={decrementQuantity} disabled={quantity <= 1} className="p-2 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                      <Minus className="size-4" />
                    </button>
                    <span className="px-4 py-2 text-sm font-medium min-w-12 text-center border-x border-zinc-300">{quantity}</span>
                    <button onClick={incrementQuantity} className="p-2 hover:bg-zinc-50 transition-colors">
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className={twMerge("border transition-all duration-200", data.data.isFavorite ? "border-primary-theme" : "border-zinc-300 hover:border-zinc-400")}
                    onClick={data.data.isFavorite ? handleRemoveFavorite : handleAddFavorite}
                    disabled={addFavoriteIsPending || removeFavoriteIsPending}>
                    {addFavoriteIsPending || removeFavoriteIsPending ? (
                      <Spinner className="size-4 border-t-black" />
                    ) : (
                      <Heart className={twMerge("size-5 transition-colors", data.data.isFavorite ? "fill-primary-theme text-primary-theme" : "text-zinc-400")} />
                    )}
                  </Button>
                </div>
              </div>
              <div className="bg-zinc-50 rounded-md p-6 space-y-4 border">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-theme/10 p-3 rounded-md border border-primary-theme/20">
                    <TruckElectric className="size-6 text-primary-theme" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-zinc-900 mb-1">Entrega Rápida</h4>
                    <p className="text-sm text-zinc-600">Receba seu pedido rapidamente com nossas opções de entrega expressa</p>
                  </div>
                </div>
                <Separator className="bg-zinc-200" />
                <div className="flex items-start gap-4">
                  <div className="bg-primary-theme/10 p-3 rounded-md border border-primary-theme/20">
                    <Undo2 className="size-6 text-primary-theme" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-zinc-900 mb-1">Devoluções Gratuitas</h4>
                    <p className="text-sm text-zinc-600">Política de devolução gratuita em até 30 dias após a compra</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-200 pt-8 space-y-8">
            <Review product={data.data} />
            <Comment productId={data.data.productId} />
          </div>
        </>
      )}
    </section>
  );
};
