import type { Lang } from "./ui";

export const routes = {
  home: { pl: "/", en: "/en/" },
  about: { pl: "/o-marce/", en: "/en/about/" },
  privacy: { pl: "/polityka-prywatnosci/", en: "/en/privacy-policy/" },
  terms: { pl: "/regulamin/", en: "/en/terms/" }
} as const;

const productFolder = { pl: "/produkty/", en: "/en/products/" } as const;

export function productPath(lang: Lang, slug: string): string {
  return `${productFolder[lang]}${slug}/`;
}

export function otherLang(lang: Lang): Lang {
  return lang === "pl" ? "en" : "pl";
}
