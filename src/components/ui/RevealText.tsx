// components/ui/RevealText.tsx
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { easeOutExpo, pageNameFromPath } from "@/constants";
import GradientText from "./GradientText";

type RevealTextProps = {
  // Overrides the label, which otherwise comes from the current route
  children?: ReactNode;
  delay?: number;
  duration?: number;
  gradient?: boolean;
  className?: string;
};

export default function RevealText({
  children,
  delay = 0.1,
  duration = 0.5,
  gradient = true,
  className = "",
}: RevealTextProps) {
  const { pathname } = useLocation();
  const label = children ?? pageNameFromPath(pathname);

  return (
    // Clipping mask: the text is invisible until it rises into this box
    <span className={`block overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={pathname}
          initial={{ y: "130%", rotate: 10 }}
          animate={{ y: "0%", rotate: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration, ease: easeOutExpo, delay }}
          style={{ transformOrigin: "0% 100%" }}
          className="block"
        >
          {gradient ? <GradientText>{label}</GradientText> : label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
