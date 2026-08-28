import { DeepAuditData, AuditFinding } from "./types";

export type ProductAnalysis = {
  score: number;

  strengths: string[];

  weaknesses: string[];

  findings: AuditFinding[];
};

export function analyzeProducts(data: DeepAuditData): ProductAnalysis {
  let score = 50;

  const strengths: string[] = [];

  const weaknesses: string[] = [];

  const findings: AuditFinding[] = [];

  /*
  =====================
  PRODUCT COUNT
  =====================
  */

  if (data.productAnalysis.productCount > 0) {
    score += 10;

    strengths.push("Products are discoverable");
  } else {
    weaknesses.push("No clear product pages detected");

    findings.push({
      title: "Limited Product Discoverability",

      description:
        "The store does not appear to have clearly accessible product pages.",

      impact:
        "Visitors may struggle to find products and continue through the buying journey.",

      recommendation:
        "Improve product navigation, collections, and product discovery paths.",

      priority: "High",
    });
  }

  /*
  =====================
  PRODUCT DESCRIPTIONS
  =====================
  */

  if (data.productAnalysis.hasProductDescriptions) {
    score += 15;

    strengths.push("Product descriptions provide information");
  } else {
    weaknesses.push("Product descriptions may lack detail");

    findings.push({
      title: "Weak Product Information",

      description:
        "Product pages may not provide enough information for confident purchasing decisions.",

      impact:
        "Customers may leave because important questions remain unanswered.",

      recommendation:
        "Improve descriptions with benefits, features, use cases, materials, and customer-focused messaging.",

      priority: "High",
    });
  }

  /*
  =====================
  PRODUCT IMAGES
  =====================
  */

  if (data.productAnalysis.hasProductImages) {
    score += 10;

    strengths.push("Product visuals are available");
  } else {
    weaknesses.push("Product visuals may not support buying decisions");

    findings.push({
      title: "Limited Product Visualization",

      description:
        "Customers may not have enough visual information to understand the product.",

      impact: "Lower confidence can reduce purchase decisions.",

      recommendation:
        "Add high-quality images, lifestyle photos, demonstrations, and product views.",

      priority: "Medium",
    });
  }

  /*
  =====================
  PRICING
  =====================
  */

  if (data.productAnalysis.hasPricing) {
    score += 10;

    strengths.push("Pricing information is visible");
  } else {
    weaknesses.push("Pricing clarity needs improvement");

    findings.push({
      title: "Pricing Clarity Gap",

      description:
        "Customers may not immediately understand product cost and value.",

      impact: "Purchase decisions may be delayed due to uncertainty.",

      recommendation:
        "Display clear pricing, value explanations, and purchase options.",

      priority: "Medium",
    });
  }

  /*
  =====================
  BENEFITS
  =====================
  */

  if (data.productAnalysis.hasBenefits) {
    score += 10;

    strengths.push("Product benefits are communicated");
  } else {
    weaknesses.push("Product value is not clearly explained");

    findings.push({
      title: "Weak Value Communication",

      description:
        "The store may explain what the product is without clearly explaining why customers need it.",

      impact: "Visitors may fail to understand the product value.",

      recommendation:
        "Highlight outcomes, benefits, problems solved, and reasons to choose the product.",

      priority: "High",
    });
  }

  /*
  =====================
  SPECIFICATIONS
  =====================
  */

  if (data.productAnalysis.hasSpecifications) {
    score += 5;

    strengths.push("Product details support comparison");
  } else {
    weaknesses.push("Missing specifications or buying details");

    findings.push({
      title: "Missing Product Details",

      description:
        "Important specifications may be unavailable for customers comparing options.",

      impact:
        "Customers may hesitate because they cannot fully evaluate the product.",

      recommendation:
        "Add specifications, dimensions, ingredients, sizing, compatibility, or technical details.",

      priority: "Medium",
    });
  }

  score = Math.min(score, 100);

  return {
    score,

    strengths,

    weaknesses,

    findings,
  };
}
