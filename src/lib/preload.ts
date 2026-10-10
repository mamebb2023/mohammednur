import publicImageUrls from "virtual:public-images";
import { componentPreloads } from "@/lib/lazy";

const FONTS_TO_LOAD = ['1em "Kulim Park"', '1em "Gendy Regular"'];
const FONT_SAMPLE = "Aa Bb Cc 0123456789 Home About Projects Contact";

const bundledImageUrls = Object.values(
  import.meta.glob("/src/assets/**/*.{jpg,jpeg,png,JPG,JPEG,PNG}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
) as string[];

const IMAGE_URLS = Array.from(new Set([...bundledImageUrls, ...publicImageUrls]));

const loadFonts = () =>
  Promise.allSettled(
    FONTS_TO_LOAD.map((font) => document.fonts.load(font, FONT_SAMPLE)),
  );

// Never rejects: a broken image shouldn't block the site
const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.decode().then(() => resolve(), () => resolve());
  });

export const getPreloadTasks = (): Promise<unknown>[] => [
  loadFonts(),
  ...componentPreloads(),
  ...IMAGE_URLS.map(preloadImage),
];