import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";

import Banner00 from "@/assets/banners/banner_00.png";
import Banner01 from "@/assets/banners/banner_01.png";
import Banner02 from "@/assets/banners/banner_02.png";
import Banner03 from "@/assets/banners/banner_03.png";
import Banner04 from "@/assets/banners/banner_04.png";

const banners = [Banner00, Banner01, Banner02, Banner03, Banner04];

export const RotatingBanner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [_, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      const nextIndex = (api.selectedScrollSnap() + 1) % banners.length;
      api.scrollTo(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [api, banners.length]);

  return (
    <Carousel
      className="rounded-md overflow-hidden"
      setApi={setApi}
      opts={{ loop: true, duration: 50 }}
    >
      <CarouselContent>
        {banners.map((banner, key) => (
          <CarouselItem key={key}>
            <img
              src={banner}
              className="rounded-md"
              alt="banner-image"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots disabled={true} />
    </Carousel>
  );
};
