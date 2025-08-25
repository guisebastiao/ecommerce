import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { categories } from "@/utils/categories";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { useRef } from "react";

const weightSlide = 500;

export const CategoriesItems = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const slider = useRef<HTMLDivElement | null>(null);

  const categoryQuery = searchParams.get("category") ?? "";

  const handleSearchCategories = (category: string) => {
    if (category === categoryQuery) {
      setSearchParams((params) => {
        params.delete("category");
        return params;
      });

      return;
    }

    setSearchParams((params) => {
      params.set("category", category);
      return params;
    });
  };

  const slideToRight = () => {
    if (!slider.current) return;
    slider.current.scrollBy({ left: weightSlide, behavior: "smooth" });
  };

  const slideToLeft = () => {
    if (!slider.current) return;
    slider.current.scrollBy({ left: -weightSlide, behavior: "smooth" });
  };

  return (
    <section className="h-24 flex justify-between gap-2 select-none">
      <Button
        size="icon"
        variant="secondary"
        className="h-full cursor-pointer rounded"
        onClick={slideToLeft}
      >
        <ChevronLeft className="size-6" />
      </Button>
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex gap-2 overflow-x-scroll scrollbar-hide scroll-smooth"
          ref={slider}
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <div
                key={index}
                className={twMerge(
                  "w-36 h-24 rounded border flex flex-col items-center justify-evenly p-0 flex-shrink-0 px-2 cursor-pointer transition-all",
                  categoryQuery === category.name &&
                    "bg-primary-theme border-none text-white",
                  categoryQuery !== category.name && "hover:bg-accent"
                )}
                onClick={() => handleSearchCategories(category.name)}
              >
                <IconComponent className="size-8 stroke-1" />
                <span className="text-sm text-center">{category.name}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        size="icon"
        variant="secondary"
        className="h-full cursor-pointer rounded"
        onClick={slideToRight}
      >
        <ChevronRight className="size-6" />
      </Button>
    </section>
  );
};
