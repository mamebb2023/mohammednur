import { AnimatePresence, motion } from "framer-motion";
import { rollTransition, rollVariants } from "@/constants";

/**
 * A value that rolls out and is replaced in place.
 * dir  1: old one leaves upward, new one rises from below
 * dir -1: the reverse (going backwards)
 * The slot takes the width of whatever is showing, so it works for single digits and whole words.
 */
export default function Roll({
  value,
  dir = 1,
  className = "",
  pad = "-my-0.5 py-0.5",
}: {
  value: string;
  dir?: number;
  className?: string;
  /** Breathing room inside the clipping box (and the margin that cancels it). Raise it for big or tight-leading text. */
  pad?: string;
}) {
  return (
    <span className={`inline-grid overflow-hidden ${pad} ${className}`}>
      <AnimatePresence initial={false} custom={dir}>
        <motion.span
          key={value}
          custom={dir}
          variants={rollVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={rollTransition}
          style={{ transformOrigin: "0% 100%" }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
