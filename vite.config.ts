import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        // keep the animation runtime in its own long-lived chunk, so a content change
        // doesn't invalidate it in everyone's browser cache
        manualChunks: (id) =>
          id.includes("node_modules/framer-motion") ||
          id.includes("node_modules/motion-dom") ||
          id.includes("node_modules/motion-utils")
            ? "motion"
            : undefined,
      },
    },
  },
});