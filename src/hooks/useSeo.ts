import { useEffect } from "react";

// Keep in sync with the static tags in index.html: those are what crawlers and
// link-preview scrapers see before (or without) JS.
export const DEFAULT_DESCRIPTION =
  "Portfolio of Mohammednur, a full-stack engineer in Addis Ababa building React & Next.js web apps.";

export const SITE_URL = "https://monur.pro.et";

type Seo = {
  title: string;
  description?: string;
  /** Absolute path of the page; defaults to the current location. */
  path?: string;
  /** Hide this page from search engines (demos, 404). */
  noindex?: boolean;
};

const setMeta = (key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = key;
    document.head.appendChild(el);
  }
  el.content = content;
};

const setProperty = (key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", key);
    document.head.appendChild(el);
  }
  el.content = content;
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
};

// Per-route metadata. Every route calls this; the values it sets are the ones
// Google reads after rendering (the index.html tags stay as the static default).
export function useSeo({ title, description, path, noindex }: Seo) {
  useEffect(() => {
    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    const desc = description ?? DEFAULT_DESCRIPTION;

    document.title = title;
    setMeta("description", desc);
    setMeta(
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );
    setCanonical(url);
    setProperty("og:title", title);
    setProperty("og:description", desc);
    setProperty("og:url", url);
    setMeta("twitter:title", title);
    setMeta("twitter:description", desc);
  }, [title, description, path, noindex]);
}
