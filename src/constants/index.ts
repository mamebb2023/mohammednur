export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const rollTransition = { duration: 0.5, ease: easeOutExpo };

export const stackVariants = {
  hidden: { y: "130%", rotate: 10 },
  visible: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 0.55, ease: easeOutExpo, delay: 0.45 + i * 0.08 },
  }),
};

export const activeSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
  bounce: 0,
};

export const hoverSpring = {
  type: "spring" as const,
  stiffness: 450,
  damping: 32,
  bounce: 0,
};
