import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  // Handle both single image and multiple images
  const imageArray = images || (image ? [image] : []);
  const hasMultipleImages = imageArray.length > 1;

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + imageArray.length) % imageArray.length
    );
  };

  // Handle drag end for swipe functionality
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 75; // Increased threshold for better UX
    const velocity = info.velocity.x;

    if (info.offset.x > threshold || (info.offset.x > 30 && velocity > 500)) {
      // Swiped right - go to previous image
      prevImage();
    } else if (
      info.offset.x < -threshold ||
      (info.offset.x < -30 && velocity < -500)
    ) {
      // Swiped left - go to next image
      nextImage();
    }
  };

  // Image loading effect
  useEffect(() => {
    if (imageArray.length > 0) {
      const img = new Image();
      img.onload = () => setIsLoaded(true);
      img.src = imageArray[0];
    }
  }, [imageArray]);

  // Auto-slide functionality
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % imageArray.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, imageArray.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex items-center justify-center"
    >
      {/* Desktop Navigation Arrows (Outside Image) */}
      {hasMultipleImages && isLoaded && (
        <div className="hidden md:flex items-center justify-center w-full max-w-lg mx-auto">
          <button
            onClick={prevImage}
            className="flex items-center justify-center text-white hover:text-gray-300 transition-colors mr-4"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="glass rounded-xl overflow-hidden max-w-md relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

            {/* Image Container */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={imageArray[currentIndex]}
                  alt={title}
                  className="w-full h-full object-cover object-center relative z-10 rounded-lg cursor-grab active:cursor-grabbing"
                  initial={{ opacity: 0, x: direction * 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -30, scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.5 },
                  }}
                  drag={hasMultipleImages ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={hasMultipleImages ? handleDragEnd : undefined}
                />
              </AnimatePresence>
            </div>

            {/* Mobile Touch Navigation */}
            <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
              {imageArray.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={nextImage}
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
            src={imageArray[currentIndex]}
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

          {/* Image Container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={imageArray[currentIndex]}
                alt={title}
                className="w-full h-full object-cover object-center relative z-10 rounded-lg cursor-grab active:cursor-grabbing"
                initial={{ opacity: 0, x: direction * 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -30, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5 },
                }}
                drag={hasMultipleImages ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={hasMultipleImages ? handleDragEnd : undefined}
              />
            </AnimatePresence>
          </div>

          {/* Mobile Touch Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {imageArray.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};
