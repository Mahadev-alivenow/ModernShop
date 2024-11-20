import * as React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselProps = {
  opts?: { axis?: "x" | "y" };
  className?: string;
  children: React.ReactNode;
};

function Carousel({ opts, className, children }: CarouselProps) {
  const [carouselRef, embla] = useEmblaCarousel(opts);

  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  return (
    <div className={cn("relative", className)}>
      <Button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2"
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </Button>
      <div ref={carouselRef} className="overflow-hidden">
        <div className="flex">{children}</div>
      </div>
      <Button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2"
      >
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

export { Carousel };
