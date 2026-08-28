export type StoreValidationResult = {
  valid: boolean;
  reason?: string;
};

async function fetchWebsite(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return "";
    }

    return await response.text();
  } catch (error) {
    console.error("VALIDATION FETCH ERROR:", error);

    return "";
  }
}

export async function validateStore(
  storeUrl: string,
): Promise<StoreValidationResult> {
  let html = "";

  try {
    const url = new URL(storeUrl);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return {
        valid: false,

        reason: "Invalid website URL.",
      };
    }

    html = await fetchWebsite(storeUrl);
  } catch {
    return {
      valid: false,

      reason: "Please enter a valid website URL.",
    };
  }

  if (!html) {
    return {
      valid: false,

      reason: "Website could not be reached.",
    };
  }

  const content = html.toLowerCase();

  const ecommerceSignals = [
    "cart",

    "checkout",

    "product",

    "shop",

    "add to cart",

    "buy now",

    "price",

    "shopify",

    "woocommerce",
  ];

  const matches = ecommerceSignals.filter((signal) => content.includes(signal));

  if (matches.length < 2) {
    return {
      valid: false,

      reason:
        "This does not appear to be an ecommerce store. Please enter a Shopify store URL.",
    };
  }

  return {
    valid: true,
  };
}
