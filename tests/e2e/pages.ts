import type { Page } from "@playwright/test";

export const PAGES = [
  { path: "/", lang: "pl", alternate: "/en/" },
  { path: "/o-marce/", lang: "pl", alternate: "/en/about/" },
  { path: "/polityka-prywatnosci/", lang: "pl", alternate: "/en/privacy-policy/" },
  { path: "/regulamin/", lang: "pl", alternate: "/en/terms/" },
  { path: "/produkty/zel-myjacy/", lang: "pl", alternate: "/en/products/cleansing-gel/" },
  { path: "/produkty/serum/", lang: "pl", alternate: "/en/products/serum/" },
  { path: "/produkty/krem/", lang: "pl", alternate: "/en/products/cream/" },
  { path: "/en/", lang: "en", alternate: "/" },
  { path: "/en/about/", lang: "en", alternate: "/o-marce/" },
  { path: "/en/privacy-policy/", lang: "en", alternate: "/polityka-prywatnosci/" },
  { path: "/en/terms/", lang: "en", alternate: "/regulamin/" },
  { path: "/en/products/cleansing-gel/", lang: "en", alternate: "/produkty/zel-myjacy/" },
  { path: "/en/products/serum/", lang: "en", alternate: "/produkty/serum/" },
  { path: "/en/products/cream/", lang: "en", alternate: "/produkty/krem/" }
] as const;

export async function skipPreloader(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem("aurea_preloader_v1", "1");
    } catch {}
  });
}

export function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", (request) => errors.push(`${request.failure()?.errorText}: ${request.url()}`));
  return errors;
}
