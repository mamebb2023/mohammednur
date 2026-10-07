import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Silk, ColorBends, Beams } from "@/lib/lazy";

const INTERVAL_MS = 6000;
const FADE_S = 1.4;

// Aliases to the lazy components keep the JSX below unchanged
const LazySilk = Silk.Component;
const LazyColorBends = ColorBends.Component;
const LazyBeams = Beams.Component;

const layers = [
  {
    key: "silk",
    node: (
      <LazySilk
        speed={5}
        scale={1}
        color="#7cff67"
        noiseIntensity={2}
        rotation={0}
      />
    ),
  },
  {
    key: "colorBlend",
    node: (
      <LazyColorBends
        colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
        rotation={90}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        noise={0.15}
        parallax={0.5}
        iterations={1}
        intensity={1.5}
        bandWidth={6}
        transparent
        autoRotate={0}
      />
    ),
  },
  {
    key: "beams",
    node: (
      <LazyBeams
        beamWidth={3}
        beamHeight={30}
        beamNumber={20}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={30}
        beamColor="#121212"
        backgroundColor="#000000"
      />
    ),
  },
];

export default function BackdropSwap() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % layers.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  const layer = layers[index];

  return (
    <div className="relative size-full overflow-hidden rounded-[inherit]">
      <AnimatePresence initial={false}>
        <motion.div
          key={layer.key}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: FADE_S, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Suspense sits inside the motion.div, so the fade still works
              if a chunk isn't ready yet */}
          <Suspense fallback={null}>{layer.node}</Suspense>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
