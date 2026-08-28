import { StoreData } from "./storeAnalyzer";

type Issue = {
  title: string;

  problem: string;

  impact: string;

  recommendation: string;
};

type FrictionReport = {
  score: number;

  categories: {
    trust: number;

    clarity: number;

    productConfidence: number;

    buyingGuidance: number;
  };

  issues: Issue[];
};

export async function generateFrictionReport(
  storeData: StoreData,

  category: string,
): Promise<FrictionReport> {
  let trust = 50;

  let clarity = 50;

  let productConfidence = 50;

  let buyingGuidance = 50;

  const issues: Issue[] = [];

  const industry = category.toLowerCase();

  /*
=========================
TRUST ANALYSIS
=========================
*/

  if (storeData.signals.hasReviews) {
    trust += 15;
  } else {
    issues.push({
      title: "Weak Trust Signals",

      problem:
        "Customers may not see enough proof that your brand is reliable.",

      impact: "Reduced purchase confidence.",

      recommendation: "Add reviews, testimonials, ratings, and customer proof.",
    });
  }

  if (storeData.signals.hasGuarantee) {
    trust += 10;
  } else {
    issues.push({
      title: "Missing Purchase Assurance",

      problem: "Customers may feel uncertain about purchase risk.",

      impact: "Higher hesitation before checkout.",

      recommendation:
        "Add guarantees, return reassurance, and risk reduction messaging.",
    });
  }

  if (storeData.signals.hasAboutPage && storeData.signals.hasContactInfo) {
    trust += 10;
  } else {
    issues.push({
      title: "Limited Brand Trust Information",

      problem: "Customers may not understand who is behind the brand.",

      impact: "Lower credibility with first-time visitors.",

      recommendation:
        "Add an About page, company story, and clear contact information.",
    });
  }

  /*
=========================
PRODUCT CONFIDENCE
=========================
*/

  if (storeData.signals.hasFAQ) {
    productConfidence += 10;
  } else {
    issues.push({
      title: "Missing Product FAQs",

      problem: "Customers may have unanswered questions before buying.",

      impact: "Visitors may leave without purchasing.",

      recommendation:
        "Create product FAQs addressing objections and common concerns.",
    });
  }

  if (storeData.signals.hasProductDetails) {
    productConfidence += 15;
  } else {
    issues.push({
      title: "Limited Product Information",

      problem:
        "Customers may not have enough details to make a confident decision.",

      impact: "Lower product confidence and slower purchases.",

      recommendation:
        "Improve descriptions, specifications, sizing, materials, and usage details.",
    });
  }

  if (storeData.signals.hasBenefits) {
    clarity += 10;
  } else {
    issues.push({
      title: "Weak Product Value Communication",

      problem: "Visitors may not quickly understand why the product matters.",

      impact: "Reduced customer interest.",

      recommendation:
        "Highlight benefits, outcomes, and reasons to choose your product.",
    });
  }

  /*
=========================
BUYING GUIDANCE
=========================
*/

  if (storeData.signals.hasShippingInfo) {
    buyingGuidance += 15;
  } else {
    issues.push({
      title: "Limited Shipping Information",

      problem: "Customers may not understand delivery expectations.",

      impact: "Checkout hesitation.",

      recommendation:
        "Clearly display shipping times, costs, and delivery timelines.",
    });
  }

  if (storeData.signals.hasRefundPolicy) {
    buyingGuidance += 10;
  } else {
    issues.push({
      title: "Missing Refund Information",

      problem: "Customers may worry about what happens after purchase.",

      impact: "Reduced buying confidence.",

      recommendation: "Add a clear refund and return policy.",
    });
  }

  /*
=========================
PRICING CLARITY
=========================
*/

  if (storeData.signals.hasPricing) {
    clarity += 10;
  } else {
    issues.push({
      title: "Pricing Clarity Gap",

      problem:
        "Customers may not immediately understand product value versus cost.",

      impact: "Purchase decisions may be delayed.",

      recommendation:
        "Make pricing, value benefits, and purchase options clearer.",
    });
  }

  /*
=========================
INDUSTRY INSIGHTS
=========================
*/

  if (
    industry.includes("beauty") &&
    (!storeData.signals.hasIngredients ||
      !storeData.signals.hasReviews ||
      !storeData.signals.hasFAQ)
  ) {
    issues.push({
      title: "Beauty Customer Education Opportunity",

      problem:
        "Beauty shoppers often need ingredient and result confidence before purchasing.",

      impact: "Customers may hesitate without education and proof.",

      recommendation:
        "Add ingredient explanations, usage guidance, testimonials, and results.",
    });
  }
  if (industry.includes("fashion")) {
    issues.push({
      title: "Fashion Confidence Opportunity",

      problem: "Customers need confidence around sizing, fit, and appearance.",

      impact: "Uncertainty can increase abandoned purchases.",

      recommendation:
        "Add size guides, customer photos, fit examples, and return reassurance.",
    });
  }

  if (industry.includes("supplement")) {
    issues.push({
      title: "Supplement Trust Opportunity",

      problem:
        "Supplement buyers need stronger confidence around safety and ingredients.",

      impact: "Trust barriers can prevent purchases.",

      recommendation:
        "Highlight ingredients, certifications, education, and usage guidance.",
    });
  }

  if (industry.includes("home")) {
    issues.push({
      title: "Home Product Visualization Opportunity",

      problem: "Customers may struggle to imagine product use.",

      impact: "Lower confidence before purchase.",

      recommendation:
        "Add dimensions, lifestyle images, demonstrations, and use cases.",
    });
  }

  /*
=========================
FINAL SCORE
=========================
*/

  trust = Math.min(trust, 100);

  clarity = Math.min(clarity, 100);

  productConfidence = Math.min(productConfidence, 100);

  buyingGuidance = Math.min(buyingGuidance, 100);

  const average = Math.round(
    (trust + clarity + productConfidence + buyingGuidance) / 4,
  );

  return {
    score: average,

    categories: {
      trust,

      clarity,

      productConfidence,

      buyingGuidance,
    },

    issues,
  };
}
