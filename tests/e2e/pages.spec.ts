import { expect, test } from "@playwright/test";
import { PAGES, collectErrors, skipPreloader } from "./pages";

test.beforeEach(async ({ page }) => {
  await skipPreloader(page);
});

for (const entry of PAGES) {
  test(`${entry.path} renderuje się poprawnie`, async ({ page, baseURL }) => {
    const errors = collectErrors(page);
    const response = await page.goto(entry.path, { waitUntil: "networkidle" });

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", entry.lang);
    await expect(page).toHaveTitle(/\S/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /^.{50,}$/s);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toBeVisible();

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical ?? "").pathname).toBe(entry.path);
    const alternate = await page.locator(`link[rel="alternate"][hreflang="${entry.lang === "pl" ? "en" : "pl"}"]`).getAttribute("href");
    expect(new URL(alternate ?? "").pathname).toBe(entry.alternate);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    const imagesWithoutAlt = await page.locator("img:not([alt])").count();
    expect(imagesWithoutAlt).toBe(0);

    const brokenImages = await page.evaluate(async () => {
      const images = [...document.images];
      images.forEach((image) => (image.loading = "eager"));
      await Promise.all(images.map((image) => image.decode().catch(() => undefined)));
      return images.filter((image) => image.naturalWidth === 0).map((image) => image.currentSrc || image.src);
    });
    expect(brokenImages).toEqual([]);

    expect(errors, `błędy na ${baseURL}${entry.path}`).toEqual([]);
  });
}

for (const lang of ["pl", "en"] as const) {
  test(`podstrony w języku ${lang} mają unikalne tytuły i opisy`, async ({ page }) => {
    const pagesInLang = PAGES.filter((entry) => entry.lang === lang);
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const entry of pagesInLang) {
      await page.goto(entry.path);
      titles.add(await page.title());
      descriptions.add((await page.locator('meta[name="description"]').getAttribute("content")) ?? "");
    }
    expect(titles.size).toBe(pagesInLang.length);
    expect(descriptions.size).toBe(pagesInLang.length);
  });
}

test("nieistniejący adres pokazuje własną stronę 404", async ({ page }) => {
  const response = await page.goto("/nie-ma-takiej-strony/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  await expect(page.locator("header .header__logo")).toBeVisible();
});

test("sitemap.xml zawiera wszystkie podstrony, a robots.txt na nią wskazuje", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const locations = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
  expect(locations.sort()).toEqual(PAGES.map((entry) => entry.path).sort());

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toMatch(/Sitemap:\s*\S+\/sitemap\.xml/);
});
