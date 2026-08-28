// ==========================
// DEEP AUDIT INPUT DATA
// ==========================

export type DeepAuditData = {
  storeUrl: string;

  pages: {
    homepage: string;

    products: string[];

    collections: string[];

    policies: string[];

    other: string[];
  };

  storeSignals: {
    hasReviews: boolean;

    hasTestimonials: boolean;

    hasGuarantee: boolean;

    hasContactInformation: boolean;

    hasAboutPage: boolean;

    hasFAQ: boolean;

    hasShippingPolicy: boolean;

    hasRefundPolicy: boolean;
  };

  productAnalysis: {
    productCount: number;

    hasProductImages: boolean;

    hasProductDescriptions: boolean;

    hasPricing: boolean;

    hasBenefits: boolean;

    hasSpecifications: boolean;
  };

  customerJourney: {
    homepageClarity: number;

    trustScore: number;

    productConfidence: number;

    buyingConfidence: number;
  };
};

// ==========================
// FREE AUDIT PREVIEW
// ==========================

export type FreeAuditPreview = {
  storeUrl: string;

  score: number;

  categories: {
    trust: number;

    products: number;

    journey: number;
  };

  topIssues: {
    title: string;

    impact: string;
  }[];
};

// ==========================
// FINDINGS
// ==========================

export type AuditFinding = {
  title: string;

  description: string;

  impact: string;

  recommendation: string;

  priority: "High" | "Medium" | "Low";
};

// ==========================
// AUDIT SECTIONS
// ==========================

export type AuditSection = {
  score: number;

  strengths: string[];

  weaknesses: string[];

  findings: AuditFinding[];
};

export type JourneySection = {
  score: number;

  insights: string[];

  findings: AuditFinding[];
};

// ==========================
// AI SCORING
// ==========================

export type AIScoreAnalysis = {
  trustScore: number;

  productScore: number;

  journeyScore: number;

  overallScore: number;

  scoringReason: string;
};

// ==========================
// AI AUDIT RESPONSE
// ==========================

export type AIAuditResponse = {
  executiveSummary: string;

  scores: {
    trust: number;

    products: number;

    journey: number;

    overall: number;

    reasoning: string;
  };

  trust: {
    strengths: string[];

    weaknesses: string[];

    findings: AuditFinding[];
  };

  products: {
    strengths: string[];

    weaknesses: string[];

    findings: AuditFinding[];
  };

  journey: {
    insights: string[];

    findings: AuditFinding[];
  };

  actionPlan: string[];
};

// ==========================
// PREMIUM AUDIT REPORT
// ==========================

export type ExecutiveSummary = {
  headline: string;

  overview: string;

  biggestOpportunity: string;

  conversionRisk: string;
};

export type RoadmapItem = {
  priority: number;

  title: string;

  problem: string;

  impact: string;

  recommendation: string;

  timeframe: string;
};

export type PremiumAuditReport = {
  storeUrl: string;

  overallScore: number;

  executiveSummary: ExecutiveSummary;

  aiScoreAnalysis: AIScoreAnalysis;

  sections: {
    trust: AuditSection;

    products: AuditSection;

    journey: JourneySection;
  };

  roadmap: RoadmapItem[];
};

// ==========================
// AUDIT SESSION
// ==========================

export type AuditSession = {
  id: string;

  storeUrl: string;

  email: string;

  leadId?: string;

  freePreviewGenerated: boolean;

  premiumUnlocked: boolean;

  createdAt: string;
};

// ==========================
// CHECKOUT SESSION
// ==========================

export type CheckoutSession = {
  id: string;

  auditId: string;

  email: string;

  amount: number;

  currency: string;

  status: "pending" | "paid" | "failed";

  createdAt: string;
};
