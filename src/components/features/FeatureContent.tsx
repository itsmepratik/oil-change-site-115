import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface FeatureContentProps {
  image?: string;
  images?: string[];
  title: string;
}

export const FeatureContent = ({
  image,
  images,
  title,
}: FeatureContentProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle both single image and multiple images
  const imageArray = images || (image ? [image] : []);
  const hasMultipleImages = imageArray.length > 1;

  // Image loading effect
  useEffect(() => {
    if (imageArray.length > 0) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = imageArray[0];
    }
  }, [imageArray]);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const goToPrevious = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const goToNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const goToSlide = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  if (!isLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex items-center justify-center"
      >
        <div className="glass rounded-xl overflow-hidden w-full max-w-md mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <div className="w-full h-64 bg-muted/20 animate-pulse rounded-lg" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex items-center justify-center"
    >
      {/* Desktop Navigation Arrows (Outside Image) */}
      {hasMultipleImages && (
        <div className="hidden md:flex items-center justify-center w-full max-w-lg mx-auto">
          <button
            onClick={goToPrevious}
            className="flex items-center justify-center text-white hover:text-gray-300 transition-colors mr-4"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="glass rounded-xl overflow-hidden max-w-md relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            
            <Carousel
              setApi={setApi}
              plugins={hasMultipleImages ? [
                Autoplay({
                  delay: 5000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                })
              ] : []}
              opts={{
                align: "start",
                loop: hasMultipleImages,
                dragFree: false,
              }}
              className="w-full"
            >
              <CarouselContent>
                {imageArray.map((imgSrc, index) => (
                  <CarouselItem key={index}>
                    <motion.img
                      src={imgSrc}
                      alt={title}
                      className="w-full h-full object-cover object-center relative z-10 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <button
            onClick={goToNext}
            className="flex items-center justify-center text-white hover:text-gray-300 transition-colors ml-4"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Mobile View (No Multiple Images) */}
      {!hasMultipleImages && (
        <div className="glass rounded-xl overflow-hidden w-full max-w-md mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <motion.img
            src={imageArray[0]}
            alt={title}
            className="w-full h-full object-cover object-center relative z-10 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}

      {/* Mobile View (With Multiple Images) */}
      {hasMultipleImages && (
        <div className="md:hidden glass rounded-xl overflow-hidden w-full max-w-md mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

          <Carousel
            setApi={setApi}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              })
            ]}
            opts={{
              align: "start",
              loop: true,
              dragFree: false,
            }}
            className="w-full"
          >
            <CarouselContent>
              {imageArray.map((imgSrc, index) => (
                <CarouselItem key={index}>
                  <motion.img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-full object-cover object-center relative z-10 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Mobile Touch Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {imageArray.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current - 1 ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
