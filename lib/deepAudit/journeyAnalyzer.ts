import { DeepAuditData, AuditFinding } from "./types";

export type JourneyAnalysis = {
  score: number;

  insights: string[];

  findings: AuditFinding[];
};

export function analyzeCustomerJourney(data: DeepAuditData): JourneyAnalysis {
  let score = 50;

  const insights: string[] = [];

  const findings: AuditFinding[] = [];

  /*
  =====================
  HOMEPAGE CLARITY
  =====================
  */

  const homepage = data.pages.homepage.toLowerCase();

  if (
    homepage.includes("quality") ||
    homepage.includes("benefit") ||
    homepage.includes("solution") ||
    homepage.includes("shop")
  ) {
    score += 15;

    insights.push("Homepage communicates product value clearly.");
  } else {
    insights.push(
      "Homepage messaging may not immediately explain customer value.",
    );

    findings.push({
      title: "Homepage Value Clarity Gap",

      description:
        "The homepage may not clearly communicate why visitors should choose the brand.",

      impact:
        "Visitors may leave before understanding the product value or brand difference.",

      recommendation:
        "Improve homepage messaging with clear benefits, customer outcomes, and a stronger value proposition.",

      priority: "High",
    });
  }

  /*
  =====================
  TRUST JOURNEY
  =====================
  */

  if (data.storeSignals.hasReviews && data.storeSignals.hasContactInformation) {
    score += 15;

    insights.push("Trust elements support customer confidence.");
  } else {
    insights.push("Customer trust may require stronger proof before purchase.");

    findings.push({
      title: "Customer Trust Journey Weakness",

      description:
        "The customer journey lacks enough trust signals to reassure new visitors.",

      impact:
        "First-time customers may hesitate before moving toward purchase.",

      recommendation:
        "Add reviews, testimonials, contact information, and brand credibility signals throughout the journey.",

      priority: "High",
    });
  }

  /*
  =====================
  PRODUCT JOURNEY
  =====================
  */

  if (
    data.productAnalysis.hasProductDescriptions &&
    data.productAnalysis.hasProductImages
  ) {
    score += 10;

    insights.push("Product pages provide useful decision support.");
  } else {
    insights.push(
      "Product pages may leave customers with unanswered questions.",
    );

    findings.push({
      title: "Product Decision Journey Gap",

      description:
        "Product pages may not provide enough information for confident buying decisions.",

      impact:
        "Customers may delay purchases because important questions remain unanswered.",

      recommendation:
        "Improve product pages with detailed descriptions, visuals, benefits, and customer guidance.",

      priority: "High",
    });
  }

  /*
  =====================
  PURCHASE JOURNEY
  =====================
  */

  if (
    data.storeSignals.hasShippingPolicy &&
    data.storeSignals.hasRefundPolicy
  ) {
    score += 10;

    insights.push("Purchase policies reduce checkout uncertainty.");
  } else {
    insights.push("Checkout confidence can improve with clearer policies.");

    findings.push({
      title: "Checkout Confidence Barrier",

      description:
        "Customers may not have enough information about delivery and returns before purchasing.",

      impact: "Uncertainty at checkout can increase abandoned purchases.",

      recommendation:
        "Clearly display shipping timelines, costs, refunds, and return policies.",

      priority: "Medium",
    });
  }

  score = Math.min(score, 100);

  return {
    score,

    insights,

    findings,
  };
}
