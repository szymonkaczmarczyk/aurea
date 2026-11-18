import type { Lang } from "../i18n/ui";
import { routes, productPath } from "../i18n/routes";
import { PRICE_CURRENCY, type Product } from "../data/products";

const BRAND_NAME = "Aurea";

type JsonLd = Record<string, unknown>;

function absolute(path: string, siteUrl: URL): string {
  return new URL(path, siteUrl).href;
}

function organizationId(siteUrl: URL): string {
  return absolute("/#organization", siteUrl);
}

export function homeStructuredData(lang: Lang, siteUrl: URL): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId(siteUrl),
        name: BRAND_NAME,
        url: absolute(routes.home.pl, siteUrl)
      },
      {
        "@type": "WebSite",
        "@id": absolute(`${routes.home[lang]}#website`, siteUrl),
        name: BRAND_NAME,
        url: absolute(routes.home[lang], siteUrl),
        inLanguage: lang,
        publisher: { "@id": organizationId(siteUrl) }
      }
    ]
  };
}

export function productStructuredData(lang: Lang, product: Product, siteUrl: URL, imageUrl?: string): JsonLd {
  const productUrl = absolute(productPath(lang, product.slug[lang]), siteUrl);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${productUrl}#product`,
        name: `${BRAND_NAME} ${product.name[lang]}`,
        description: product.lead[lang],
        url: productUrl,
        ...(imageUrl ? { image: [imageUrl] } : {}),
        brand: { "@type": "Brand", name: BRAND_NAME },
        manufacturer: { "@id": organizationId(siteUrl) },
        category: product.kind[lang],
        size: product.volume,
        inLanguage: lang,
        offers: {
          "@type": "Offer",
          url: productUrl,
          price: product.price,
          priceCurrency: PRICE_CURRENCY
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: BRAND_NAME, item: absolute(routes.home[lang], siteUrl) },
          { "@type": "ListItem", position: 2, name: product.name[lang], item: productUrl }
        ]
      }
    ]
  };
}

export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
