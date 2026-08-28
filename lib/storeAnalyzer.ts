export type StoreData = {
  url: string;

  title: string;

  content: string;

  signals: {
    hasFAQ: boolean;

    hasReviews: boolean;

    hasGuarantee: boolean;

    hasShippingInfo: boolean;

    hasRefundPolicy: boolean;

    hasAboutPage: boolean;

    hasContactInfo: boolean;

    hasIngredients: boolean;

    hasBenefits: boolean;

    hasPricing: boolean;

    hasProductDetails: boolean;
  };
};

async function fetchPage(url: string) {
  try {
    const response = await fetch(
      url,

      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Could not fetch website");
    }

    return await response.text();
  } catch (error) {
    console.error("FETCH PAGE ERROR:", error);

    return "";
  }
}

function extractText(html: string) {
  return html

    .replace(/<script[\s\S]*?<\/script>/gi, "")

    .replace(/<style[\s\S]*?<\/style>/gi, "")

    .replace(/<[^>]+>/g, " ")

    .replace(/\s+/g, " ")

    .trim();
}

export async function analyzeStore(storeUrl: string): Promise<StoreData> {
  const html = await fetchPage(storeUrl);

  const text = extractText(html);

  const lowerText = text.toLowerCase();

  const storeData: StoreData = {
    url: storeUrl,

    title: text.substring(0, 120),

    content: text.substring(0, 8000),

    signals: {
      hasFAQ:
        lowerText.includes("faq") || lowerText.includes("frequently asked"),

      hasReviews:
        lowerText.includes("review") ||
        lowerText.includes("testimonial") ||
        lowerText.includes("customer story"),

      hasGuarantee:
        lowerText.includes("guarantee") ||
        lowerText.includes("money back") ||
        lowerText.includes("risk free"),

      hasShippingInfo:
        lowerText.includes("shipping") || lowerText.includes("delivery"),

      hasRefundPolicy:
        lowerText.includes("refund") || lowerText.includes("return policy"),

      hasAboutPage:
        lowerText.includes("about us") || lowerText.includes("our story"),

      hasContactInfo:
        lowerText.includes("contact") ||
        lowerText.includes("email") ||
        lowerText.includes("phone"),

      hasIngredients:
        lowerText.includes("ingredients") || lowerText.includes("materials"),

      hasBenefits:
        lowerText.includes("benefits") || lowerText.includes("why choose"),

      hasPricing: lowerText.includes("$") || lowerText.includes("price"),

      hasProductDetails:
        lowerText.includes("size") ||
        lowerText.includes("details") ||
        lowerText.includes("description"),
    },
  };

  return storeData;
}
