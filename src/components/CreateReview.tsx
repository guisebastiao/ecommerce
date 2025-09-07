import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const CreateReview = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="flex w-full justify-center">
        {Array.from({ length: 5 }, (_, index) => {
          const starIndex = index + 1;
          const isFilled = (hovered ?? selected) >= starIndex;
          return (
            <div key={starIndex} onMouseEnter={() => setHovered(starIndex)} onMouseLeave={() => setHovered(null)} onClick={() => setSelected(starIndex)} role="button" tabIndex={0}>
              {isFilled ? <Star className="fill-amber-300 stroke-amber-300 size-7" /> : <Star className="fill-transparent stroke-amber-300 size-7" />}
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-5">
        <Button className="w-full">Avaliar</Button>
      </div>
    </div>
  );
};
