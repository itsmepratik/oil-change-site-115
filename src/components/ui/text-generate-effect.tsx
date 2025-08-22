"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export const TextGenerateEffect = ({
  words,
  className = "",
}: {
  words: string;
  className?: string;
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => words.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, words.length, {
      type: "tween",
      duration: 0.8, // Faster typing speed
      ease: [0.25, 0.46, 0.45, 0.94], // Smooth cubic-bezier easing
    });
    return controls.stop;
  }, [words]);

  return <motion.span className={className}>{displayText}</motion.span>;
};
