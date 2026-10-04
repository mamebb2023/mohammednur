import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const VIRTUAL_ID = "virtual:public-images";
const RESOLVED_ID = "\0" + VIRTUAL_ID;
const IMAGE_RE = /\.(jpe?g|png)$/i;

function walk(dir: string, prefix = ""): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return walk(path.join(dir, entry.name), rel);
    return IMAGE_RE.test(entry.name) ? [rel] : [];
  });
}

export default function publicImages(): Plugin {
  let publicDir: string | false = false;
  let base = "/";

  return {
    name: "public-images",
    configResolved(config) {
      publicDir = config.publicDir;
      base = config.base;
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const files =
        publicDir && fs.existsSync(publicDir) ? walk(publicDir) : [];
      const urls = files.map((file) => encodeURI(base + file));
      return `export default ${JSON.stringify(urls)};`;
    },
  };
}