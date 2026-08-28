export type PageType =
  | "homepage"
  | "product"
  | "collection"
  | "policy"
  | "trust"
  | "other";

export function classifyPage(url: string): PageType {
  const page = url.toLowerCase();

  if (page.includes("product") || page.includes("/p/")) {
    return "product";
  }

  if (page.includes("collection") || page.includes("category")) {
    return "collection";
  }

  if (
    page.includes("shipping") ||
    page.includes("refund") ||
    page.includes("privacy") ||
    page.includes("terms")
  ) {
    return "policy";
  }

  if (
    page.includes("about") ||
    page.includes("contact") ||
    page.includes("story")
  ) {
    return "trust";
  }

  return "other";
}

export function classifyPages(urls: string[]) {
  return urls.map((url) => ({
    url,

    type: classifyPage(url),
  }));
}
