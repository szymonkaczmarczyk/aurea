import type { APIRoute } from "astro";
import { routes, productPath } from "../i18n/routes";
import { products } from "../data/products";

type PagePair = { pl: string; en: string };

const pagePairs: PagePair[] = [
  ...Object.values(routes),
  ...products.map((product) => ({ pl: productPath("pl", product.slug.pl), en: productPath("en", product.slug.en) }))
];

export const GET: APIRoute = ({ site }) => {
  const absolute = (path: string) => new URL(path, site).href;
  const entries = pagePairs.flatMap((pair) =>
    [pair.pl, pair.en].map((path) => [
      "  <url>",
      `    <loc>${absolute(path)}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="pl" href="${absolute(pair.pl)}"/>`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${absolute(pair.en)}"/>`,
      "  </url>"
    ].join("\n"))
  );
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>"
  ].join("\n");
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
