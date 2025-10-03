import { motion } from "framer-motion";

interface LogoCarouselProps {
  logoSize?: number; // Logo height in pixels
  animationDuration?: number; // Animation duration in seconds
}

const LogoCarousel = ({
  logoSize = 256,
  animationDuration = 60,
}: LogoCarouselProps) => {
  const logos = [
    "/Brand shit/1.svg",
    "/Brand shit/2.svg",
    "/Brand shit/3.svg",
    "/Brand shit/4.svg",
    "/Brand shit/5.svg",
    "/Brand shit/6.svg",
    "/Brand shit/7.svg",
    "/Brand shit/8.svg",
    "/Brand shit/9.svg",
    "/Brand shit/10.svg",
    "/Brand shit/11.svg",
    "/Brand shit/12.svg",
  ];

  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <>
      {/* Mobile-only section: Full opacity, no dimming effects */}
      <div className="w-full overflow-hidden bg-black py-12 relative block md:hidden">
        {/* Gradient overlay for seamless transition from hero */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none z-10" />
        {/* Bottom gradient for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
        <motion.div
          key={`mobile-carousel-${animationDuration}`} // Force re-render when duration changes
          className="flex space-x-16 relative z-20"
          initial={{ opacity: 0, x: "0%" }}
          animate={{
            opacity: 1,
            x: "-50%",
          }}
          transition={{
            opacity: { duration: 0.5 },
            x: {
              duration: animationDuration, // Use configurable animation duration
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            },
          }}
          style={{
            width: "fit-content",
            display: "flex",
            gap: "4rem",
          }}
        >
          {extendedLogos.map((logo, index) => (
            <motion.img
              key={`mobile-logo-${index}`}
              src={logo}
              alt={`Partner logo ${index + 1}`}
              className="w-auto object-contain"
              style={{ height: `${logoSize}px` }}
              initial={{ opacity: 1 }} // Full opacity on mobile
              animate={{ opacity: 1 }} // Full opacity on mobile
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Desktop-only section: Dimming effects preserved */}
      <div className="w-full overflow-hidden bg-black py-12 relative hidden md:block">
        {/* Gradient overlay for seamless transition from hero */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none z-10" />
        {/* Bottom gradient for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
        <motion.div
          key={`desktop-carousel-${animationDuration}`} // Force re-render when duration changes
          className="flex space-x-16 relative z-20"
          initial={{ opacity: 0, x: "0%" }}
          animate={{
            opacity: 1,
            x: "-50%",
          }}
          transition={{
            opacity: { duration: 0.5 },
            x: {
              duration: animationDuration, // Use configurable animation duration
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            },
          }}
          style={{
            width: "fit-content",
            display: "flex",
            gap: "4rem",
          }}
        >
          {extendedLogos.map((logo, index) => (
            <motion.img
              key={`desktop-logo-${index}`}
              src={logo}
              alt={`Partner logo ${index + 1}`}
              className="w-auto object-contain"
              style={{ height: `${logoSize}px` }}
              initial={{ opacity: 0.5 }} // Dimmed on desktop
              animate={{ opacity: 0.5 }} // Dimmed on desktop
              whileHover={{
                opacity: 1,
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default LogoCarousel;
