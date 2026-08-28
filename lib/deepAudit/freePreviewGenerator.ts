import { DeepAuditData, FreeAuditPreview } from "./types";

import { analyzeTrust } from "./trustAnalyzer";

import { analyzeProducts } from "./productAnalyzer";

import { analyzeCustomerJourney } from "./journeyAnalyzer";

export function generateFreePreview(data: DeepAuditData): FreeAuditPreview {
  const trust = analyzeTrust(data);

  const products = analyzeProducts(data);

  const journey = analyzeCustomerJourney(data);

  console.log("TRUST FINDINGS COUNT:", trust.findings?.length ?? 0);

  console.log("PRODUCT FINDINGS COUNT:", products.findings?.length ?? 0);

  console.log("JOURNEY FINDINGS COUNT:", journey.findings?.length ?? 0);

  const allIssues = [
    ...(trust.findings ?? []),

    ...(products.findings ?? []),

    ...(journey.findings ?? []),
  ];

  return {
    storeUrl: data.storeUrl,

    score: Math.round((trust.score + products.score + journey.score) / 3),

    categories: {
      trust: trust.score,

      products: products.score,

      journey: journey.score,
    },

    topIssues: allIssues

      .slice(0, 3)

      .map((issue) => ({
        title: issue.title,

        impact: issue.impact,
      })),
  };
}
