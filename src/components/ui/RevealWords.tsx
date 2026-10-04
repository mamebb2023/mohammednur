// components/ui/RevealWords.tsx
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/constants";

type Pill = {
  pill: true;
  image?: string;
  alt?: string;
  className?: string;
  children?: ReactNode;
};
type Part = string | Pill;

type RevealWordsProps = {
  parts: Part[];
  delay?: number;
  stagger?: number;
  className?: string;
};

type Token =
  | { type: "word"; word: string }
  | {
      type: "pill";
      image?: string;
      alt?: string;
      className?: string;
      children?: ReactNode;
    };

export default function RevealWords({
  parts,
  delay = 0.45,
  stagger = 0.03,
  className = "",
}: RevealWordsProps) {
  // Strings are split into words, pills stay as single tokens
  const tokens: Token[] = parts.flatMap((part) =>
    typeof part === "string"
      ? part
          .split(" ")
          .filter(Boolean)
          .map((word): Token => ({ type: "word", word }))
      : [
          {
            type: "pill",
            image: part.image,
            alt: part.alt,
            className: part.className,
            children: part.children,
          } as Token,
        ],
  );

  // Screen readers get the sentence once; pills are decorative
  const label = parts
    .filter((p): p is string => typeof p === "string")
    .join(" ");

  return (
    <p className={className} aria-label={label}>
      {tokens.map((token, i) => {
        const transition = {
          duration: 0.7,
          ease: easeOutExpo,
          delay: delay + i * stagger,
        };

        if (token.type === "pill") {
          return (
            <span
              key={i}
              aria-hidden="true"
              className="mr-[0.25em] inline-block h-[2em] w-[4em] overflow-hidden align-middle"
            >
              <motion.span
                initial={{ y: "130%", rotate: 10 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={transition}
                style={{ transformOrigin: "0% 100%" }}
                className={`block h-full w-full overflow-hidden rounded-full ${token.className ?? "bg-primary"}`}
              >
                {token.image ? (
                  <motion.img
                    src={token.image}
                    alt={token.alt ?? ""}
                    decoding="async"
                    draggable={false}
                    initial={{ scale: 1.4 }}
                    animate={{ scale: 1 }}
                    transition={{ ...transition, duration: 1.1 }}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  token.children
                )}
              </motion.span>
            </span>
          );
        }

        return (
          <span
            key={i}
            aria-hidden="true"
            className="mr-[0.25em] my-[-0.15em] inline-block overflow-hidden py-[0.15em] align-top"
          >
            <motion.span
              initial={{ y: "130%", rotate: 10 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={transition}
              style={{ transformOrigin: "0% 100%" }}
              className="inline-block"
            >
              {token.word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
