import { DeepAuditData, AuditFinding } from "./types";

export type TrustAnalysis = {
  score: number;

  strengths: string[];

  weaknesses: string[];

  findings: AuditFinding[];
};

export function analyzeTrust(data: DeepAuditData): TrustAnalysis {
  let score = 50;

  const strengths: string[] = [];

  const weaknesses: string[] = [];

  const findings: AuditFinding[] = [];

  /*
  =====================
  REVIEWS
  =====================
  */

  if (data.storeSignals.hasReviews) {
    score += 15;

    strengths.push("Customer reviews are present");
  } else {
    weaknesses.push("Missing customer reviews or social proof");

    findings.push({
      title: "Weak Social Proof Foundation",

      description:
        "The store does not appear to provide enough customer proof to reassure first-time visitors.",

      impact:
        "New customers may hesitate because they lack evidence that other buyers trust the brand.",

      recommendation:
        "Add verified reviews, customer testimonials, ratings, and user-generated content.",

      priority: "High",
    });
  }

  /*
  =====================
  TESTIMONIALS
  =====================
  */

  if (data.storeSignals.hasTestimonials) {
    score += 10;

    strengths.push("Customer success stories improve credibility");
  } else {
    weaknesses.push("Limited customer success stories");

    findings.push({
      title: "Limited Customer Proof",

      description:
        "The store lacks visible customer stories showing successful product experiences.",

      impact:
        "Visitors may struggle to trust the product outcome before purchasing.",

      recommendation:
        "Add testimonials, customer photos, case studies, and before-after examples.",

      priority: "Medium",
    });
  }

  /*
  =====================
  GUARANTEE
  =====================
  */

  if (data.storeSignals.hasGuarantee) {
    score += 10;

    strengths.push("Risk reduction messaging exists");
  } else {
    weaknesses.push("No visible guarantee or purchase reassurance");

    findings.push({
      title: "Missing Purchase Assurance",

      description:
        "Customers may not see enough reassurance around purchase risk.",

      impact: "Fear of making the wrong decision can reduce conversions.",

      recommendation:
        "Add guarantees, return reassurance, and confidence messaging.",

      priority: "High",
    });
  }

  /*
  =====================
  BRAND INFORMATION
  =====================
  */

  if (
    data.storeSignals.hasAboutPage &&
    data.storeSignals.hasContactInformation
  ) {
    score += 15;

    strengths.push("Brand information improves credibility");
  } else {
    weaknesses.push("Brand story or contact information is limited");

    findings.push({
      title: "Limited Brand Trust Information",

      description:
        "Visitors may not understand who operates the business or why they should trust it.",

      impact:
        "First-time customers may leave without building enough confidence.",

      recommendation:
        "Add an About page, brand story, contact details, and company information.",

      priority: "Medium",
    });
  }

  /*
  =====================
  POLICY TRUST
  =====================
  */

  if (
    data.storeSignals.hasShippingPolicy &&
    data.storeSignals.hasRefundPolicy
  ) {
    score += 10;

    strengths.push("Purchase policies are visible");
  } else {
    weaknesses.push("Important purchase policies are missing");

    findings.push({
      title: "Missing Purchase Policies",

      description:
        "Customers may not clearly understand shipping expectations or return options.",

      impact:
        "Checkout hesitation may increase because perceived risk is higher.",

      recommendation: "Display clear shipping, refund, and return policies.",

      priority: "High",
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
