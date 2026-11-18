import { expect, test } from "@playwright/test";
import { skipPreloader } from "./pages";

test.describe("z pominiętym preloaderem", () => {
  test.beforeEach(async ({ page }) => {
    await skipPreloader(page);
  });

  test("menu otwiera się, zamyka klawiszem Escape i oddaje fokus", async ({ page }) => {
    await page.goto("/");
    const button = page.locator(".header__menu-btn");
    const aboutLink = page.locator("#site-menu").getByRole("link", { name: "O marce" });

    await expect(button).toHaveAttribute("aria-expanded", "false");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(aboutLink).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();
    await expect(aboutLink).toBeHidden();
  });

  test("link z menu prowadzi na podstronę o marce", async ({ page }) => {
    await page.goto("/");
    await page.locator(".header__menu-btn").click();
    await page.locator("#site-menu").getByRole("link", { name: "O marce" }).click();
    await expect(page).toHaveURL(/\/o-marce\/$/);
  });

  test("przełącznik języka prowadzi do odpowiednika strony", async ({ page }) => {
    async function switchLanguage(targetLang: "pl" | "en") {
      const headerSwitch = page.locator(".header__round.is-lang");
      if (await headerSwitch.isVisible()) {
        await headerSwitch.click();
        return;
      }
      await page.locator(".header__menu-btn").click();
      await page.locator(`#site-menu a[hreflang="${targetLang}"]`).click();
    }

    await page.goto("/produkty/serum/");
    await switchLanguage("en");
    await expect(page).toHaveURL(/\/en\/products\/serum\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await switchLanguage("pl");
    await expect(page).toHaveURL(/\/produkty\/serum\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "pl");
  });

  test("motyw nocny włącza się i zostaje po przeładowaniu", async ({ page }) => {
    await page.goto("/");
    const body = page.locator("body");
    const toggle = page.locator("[data-theme-toggle]");

    await expect(body).toHaveClass(/\blight\b/);
    await toggle.click();
    await expect(body).not.toHaveClass(/\blight\b/);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await page.reload();
    await expect(body).not.toHaveClass(/\blight\b/);

    await toggle.click();
    await expect(body).toHaveClass(/\blight\b/);
  });

  test("link pomijający nawigację jest pierwszy w kolejności fokusu", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium");
    await page.goto("/o-marce/");
    await page.keyboard.press("Tab");
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toHaveAttribute("href", "#main");
  });
});

test("preloader pokazuje się tylko przy pierwszej wizycie", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/\bis-loading\b/);
  await expect(page.locator("html")).not.toHaveClass(/\bis-loading\b/, { timeout: 8000 });
  expect(await page.evaluate(() => localStorage.getItem("aurea_preloader_v1"))).toBe("1");

  await page.reload();
  await expect(page.locator("html")).not.toHaveClass(/\bis-loading\b/);
});

test.describe("przy ograniczonym ruchu", () => {
  test.use({ reducedMotion: "reduce" });

  test("preloader się nie pokazuje, a treść hero jest widoczna", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/\bis-loading\b/);
    await expect(page.locator(".hero__title")).toBeVisible();
    await expect(page.locator(".preloader")).toBeHidden();
  });
});
