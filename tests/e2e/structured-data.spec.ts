import { expect, test, type Page } from "@playwright/test";
import { PAGES } from "./pages";

type Node = Record<string, any>;

async function readGraph(page: Page): Promise<Node[]> {
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  return blocks.flatMap((block) => {
    const data = JSON.parse(block);
    expect(data["@context"]).toBe("https://schema.org");
    return data["@graph"] ?? [data];
  });
}

function nodeOfType(graph: Node[], type: string): Node {
  const node = graph.find((candidate) => candidate["@type"] === type);
  expect(node, `brak węzła ${type}`).toBeTruthy();
  return node!;
}

test.describe("dane strukturalne schema.org", () => {
  test.skip(({ isMobile }) => isMobile, "treść JSON-LD nie zależy od szerokości ekranu");

  for (const entry of PAGES) {
    test(`${entry.path} ma poprawny JSON-LD`, async ({ page }) => {
      await page.goto(entry.path);
      const graph = await readGraph(page);
      const canonical = (await page.locator('link[rel="canonical"]').getAttribute("href")) ?? "";
      const origin = new URL(canonical).origin;

      for (const node of graph) {
        for (const key of ["@id", "url"]) {
          if (node[key]) expect(new URL(node[key]).origin).toBe(origin);
        }
      }

      const isHome = entry.path === "/" || entry.path === "/en/";
      const isProduct = entry.path.includes("/produkty/") || entry.path.includes("/products/");

      if (isHome) {
        const organization = nodeOfType(graph, "Organization");
        const website = nodeOfType(graph, "WebSite");
        expect(organization.name).toBe("Aurea");
        expect(website.url).toBe(canonical);
        expect(website.inLanguage).toBe(entry.lang);
        expect(website.publisher["@id"]).toBe(organization["@id"]);
        return;
      }

      if (isProduct) {
        const product = nodeOfType(graph, "Product");
        const breadcrumbs = nodeOfType(graph, "BreadcrumbList");
        const heading = (await page.locator("h1").textContent())?.trim() ?? "";
        const shownPrice = (await page.locator(".product__facts dd").nth(1).textContent()) ?? "";

        expect(product.url).toBe(canonical);
        expect(product.name).toBe(`Aurea ${heading}`);
        expect(product.brand).toEqual({ "@type": "Brand", name: "Aurea" });
        expect(product.description.length).toBeGreaterThan(20);
        expect(product.offers.priceCurrency).toBe("PLN");
        expect(typeof product.offers.price).toBe("number");
        expect(shownPrice.replace(/\D/g, "")).toBe(String(product.offers.price));

        const items = breadcrumbs.itemListElement;
        expect(items.map((item: Node) => item.position)).toEqual([1, 2]);
        expect(items[1].item).toBe(canonical);
        expect(items[1].name).toBe(heading);
        return;
      }

      expect(graph).toEqual([]);
    });
  }
});
