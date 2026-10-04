// components/ui/RevealText.tsx
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/constants";
import GradientText from "./GradientText";

type RevealTextProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  gradient?: boolean;
  className?: string;
};

export default function RevealText({
  children,
  delay = 0.2,
  duration = 0.9,
  gradient = true,
  className = "",
}: RevealTextProps) {
  return (
    // Clipping mask: the text is invisible until it rises into this box
    <span className={`block overflow-hidden py-[0.15em] ${className}`}>
      <motion.span
        initial={{ y: "130%", rotate: 10 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration, ease: easeOutExpo, delay }}
        style={{ transformOrigin: "0% 100%" }}
        className="block"
      >
        {gradient ? <GradientText>{children}</GradientText> : children}
      </motion.span>
    </span>
  );
}
