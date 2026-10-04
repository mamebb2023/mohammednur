import { useMemo, useRef, type CSSProperties } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface LotusProps {
  size?: string;
  gradient?: string;
  petalCount?: number;
  animatePetals?: boolean;
  displayDelay?: number;
  isStatic?: boolean;
}

const SPREAD = 150;

export default function Lotus({
  size = "h-[600px] w-[320px]",
  gradient = "bg-gradient-to-b from-emerald-500 via-primary/50 to-transparent",
  petalCount = 7,
  animatePetals = true,
  displayDelay = 0,
  isStatic = false,
}: LotusProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef);

  // Static or reduced motion: render the final pose immediately, no sway
  const skipMotion = isStatic;
  const sway = animatePetals && !skipMotion;

  const petals = useMemo(() => {
    const mid = (petalCount - 1) / 2;
    return Array.from({ length: petalCount }, (_, i) => {
      const angle =
        petalCount === 1 ? 0 : -SPREAD / 2 + (i * SPREAD) / (petalCount - 1);
      const distance = Math.abs(i - mid);
      const opacity = Math.max(0.25, 0.9 - distance * 0.2);
      return { angle, distance, opacity };
    });
  }, [petalCount]);

  // Bloom from the center outward
  const petalVariants: Variants = {
    hidden: { opacity: 0, scaleY: 0, rotate: 0 },
    visible: (i: number) => ({
      opacity: petals[i].opacity,
      scaleY: 1,
      rotate: petals[i].angle,
      transition: {
        duration: 1,
        delay: displayDelay + petals[i].distance * 0.15,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div ref={rootRef} className="relative flex items-center justify-center">
      {petals.map((_, i) => (
        // Outer: entrance + resting angle (Framer Motion owns this transform)
        <motion.div
          key={i}
          custom={i}
          variants={petalVariants}
          initial={skipMotion ? false : "hidden"}
          animate="visible"
          style={{ transformOrigin: "center bottom" }}
          className={`absolute will-change-transform ${size}`}
        >
          {/* Inner: gradient shape + idle sway (CSS owns this transform) */}
          <div
            className={`h-full w-full rounded-[50%] ${gradient} ${
              sway ? "lotus-sway" : ""
            }`}
            style={
              sway
                ? ({
                    "--sway": `${(i % 2 ? -1 : 1) * (2 + (i % 3))}deg`,
                    animationDuration: `${3.6 + (i % 3) * 0.4}s`,
                    animationDelay: `${-i * 0.4}s`,
                    animationPlayState: inView ? "running" : "paused",
                  } as CSSProperties)
                : undefined
            }
          />
        </motion.div>
      ))}
    </div>
  );
}
