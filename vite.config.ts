import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";
import publicImages from "./src/plugins/publicImages.ts";
export default defineConfig({
  plugins: [react(), tailwindcss(), publicImages()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
});
