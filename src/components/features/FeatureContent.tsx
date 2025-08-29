import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
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
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle both single image and multiple images
  const imageArray = images || (image ? [image] : []);
  const hasMultipleImages = imageArray.length > 1;

  // Desktop carousel
  const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      dragFree: false,
    },
    hasMultipleImages ? [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })] : []
  );

  // Mobile carousel  
  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel(
    { 
      loop: true,
      align: "start", 
      dragFree: false,
    },
    hasMultipleImages ? [Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })] : []
  );

  // Image loading effect
  useEffect(() => {
    if (imageArray.length > 0) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = imageArray[0];
    }
  }, [imageArray]);

  // Desktop carousel effects
  useEffect(() => {
    if (!emblaApiDesktop) return;

    const onSelect = () => {
      setCurrent(emblaApiDesktop.selectedScrollSnap());
    };

    emblaApiDesktop.on("select", onSelect);
    onSelect();

    return () => {
      emblaApiDesktop.off("select", onSelect);
    };
  }, [emblaApiDesktop]);

  // Mobile carousel effects
  useEffect(() => {
    if (!emblaApiMobile) return;

    const onSelect = () => {
      setCurrent(emblaApiMobile.selectedScrollSnap());
    };

    emblaApiMobile.on("select", onSelect);
    onSelect();

    return () => {
      emblaApiMobile.off("select", onSelect);
    };
  }, [emblaApiMobile]);

  const scrollPrevDesktop = useCallback(() => {
    if (emblaApiDesktop) emblaApiDesktop.scrollPrev();
  }, [emblaApiDesktop]);

  const scrollNextDesktop = useCallback(() => {
    if (emblaApiDesktop) emblaApiDesktop.scrollNext();
  }, [emblaApiDesktop]);

  const scrollToMobile = useCallback((index: number) => {
    if (emblaApiMobile) emblaApiMobile.scrollTo(index);
  }, [emblaApiMobile]);

  if (!isLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full flex items-center justify-center"
      >
        <div className="glass rounded-xl overflow-hidden w-full max-w-md mx-auto">
          <div className="w-full h-full bg-muted/20 animate-pulse rounded-lg" />
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
      {/* Desktop Navigation (Outside Image) */}
      {hasMultipleImages && (
        <div className="hidden md:flex items-center justify-center w-full max-w-lg mx-auto">
          <button
            onClick={scrollPrevDesktop}
            className="flex items-center justify-center text-white hover:text-gray-300 transition-colors mr-4 z-10"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="glass rounded-xl overflow-hidden max-w-md">
            <div className="embla" ref={emblaRefDesktop}>
              <div className="embla__container flex">
                {imageArray.map((imgSrc, index) => (
                  <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                  <motion.img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-full object-cover object-center rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={scrollNextDesktop}
            className="flex items-center justify-center text-white hover:text-gray-300 transition-colors ml-4 z-10"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Single Image (No Multiple Images) */}
      {!hasMultipleImages && (
        <div className="rounded-xl overflow-hidden w-full max-w-md mx-auto">
        <motion.img
          src={imageArray[0]}
          alt={title}
          className="w-full h-full object-cover object-center rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        </div>
      )}

      {/* Mobile View (With Multiple Images) */}
      {hasMultipleImages && (
        <div className="md:hidden rounded-xl overflow-hidden w-full max-w-md mx-auto">

          <div className="embla" ref={emblaRefMobile}>
            <div className="embla__container flex">
              {imageArray.map((imgSrc, index) => (
                <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                  <motion.img
                    src={imgSrc}
                    alt={title}
                    className="w-full h-full object-cover object-center rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};