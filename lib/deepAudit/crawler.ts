import { DeepAuditData } from "./types";

async function fetchPage(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      throw new Error("Could not fetch page");
    }

    return await response.text();
  } catch (error) {
    console.error("CRAWLER FETCH ERROR:", error);

    return "";
  }
}

function extractLinks(html: string) {
  const links: string[] = [];

  const matches = html.match(/href=["']([^"']+)["']/gi);

  if (!matches) {
    return [];
  }

  matches.forEach((match) => {
    const url = match.replace(/href=["']/, "").replace(/["']/, "");

    links.push(url);
  });

  return links;
}

function classifyPages(links: string[], baseUrl: string) {
  const pages = {
    products: [] as string[],

    collections: [] as string[],

    policies: [] as string[],

    other: [] as string[],
  };

  links.forEach((link) => {
    const fullUrl = link.startsWith("http") ? link : `${baseUrl}${link}`;

    const lower = fullUrl.toLowerCase();

    if (lower.includes("product") || lower.includes("products")) {
      pages.products.push(fullUrl);
    } else if (lower.includes("collection")) {
      pages.collections.push(fullUrl);
    } else if (
      lower.includes("policy") ||
      lower.includes("shipping") ||
      lower.includes("refund")
    ) {
      pages.policies.push(fullUrl);
    } else {
      pages.other.push(fullUrl);
    }
  });

  return pages;
}

export async function crawlStore(storeUrl: string): Promise<DeepAuditData> {
  const homepageHTML = await fetchPage(storeUrl);

  const links = extractLinks(homepageHTML);

  const discoveredPages = classifyPages(links, storeUrl);

  const data: DeepAuditData = {
    storeUrl,

    pages: {
      homepage: homepageHTML,

      products: discoveredPages.products.slice(0, 10),

      collections: discoveredPages.collections.slice(0, 10),

      policies: discoveredPages.policies.slice(0, 10),

      other: discoveredPages.other.slice(0, 10),
    },

    storeSignals: {
      hasReviews: homepageHTML.toLowerCase().includes("review"),

      hasTestimonials: homepageHTML.toLowerCase().includes("testimonial"),

      hasGuarantee: homepageHTML.toLowerCase().includes("guarantee"),

      hasContactInformation: homepageHTML.toLowerCase().includes("contact"),

      hasAboutPage: homepageHTML.toLowerCase().includes("about"),

      hasFAQ: homepageHTML.toLowerCase().includes("faq"),

      hasShippingPolicy: homepageHTML.toLowerCase().includes("shipping"),

      hasRefundPolicy: homepageHTML.toLowerCase().includes("refund"),
    },

    productAnalysis: {
      productCount: discoveredPages.products.length,

      hasProductImages: homepageHTML.includes("<img"),

      hasProductDescriptions: homepageHTML.length > 1000,

      hasPricing: homepageHTML.includes("$") || homepageHTML.includes("price"),

      hasBenefits: homepageHTML.toLowerCase().includes("benefit"),

      hasSpecifications: homepageHTML.toLowerCase().includes("spec"),
    },

    customerJourney: {
      homepageClarity: 0,

      trustScore: 0,

      productConfidence: 0,

      buyingConfidence: 0,
    },
  };

  return data;
}
