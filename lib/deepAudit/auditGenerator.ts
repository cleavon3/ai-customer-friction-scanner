import { DeepAuditData, PremiumAuditReport } from "./types";

import { analyzeTrust } from "./trustAnalyzer";

import { analyzeProducts } from "./productAnalyzer";

import { analyzeCustomerJourney } from "./journeyAnalyzer";

import { generateAIAudit } from "@/lib/ai/auditWriter";

import { validateAIScore } from "@/lib/ai/scoreValidator";

import { adjustScoreFromFindings } from "@/lib/ai/scoreConsistency";

export async function generateAuditReport(
  data: DeepAuditData,
): Promise<PremiumAuditReport> {
  console.log("STARTING RULE BASED ANALYSIS");

  const trustAnalysis = analyzeTrust(data);

  const productAnalysis = analyzeProducts(data);

  const journeyAnalysis = analyzeCustomerJourney(data);

  console.log("STARTING OPENAI ANALYSIS");

  const aiAudit = await generateAIAudit(data);

  console.log("OPENAI ANALYSIS COMPLETE");

  const trustFindings = aiAudit.trust?.findings?.length
    ? aiAudit.trust.findings
    : trustAnalysis.findings;

  const productFindings = aiAudit.products?.findings?.length
    ? aiAudit.products.findings
    : productAnalysis.findings;

  const journeyFindings = aiAudit.journey?.findings?.length
    ? aiAudit.journey.findings
    : journeyAnalysis.findings;

  const trustScore = adjustScoreFromFindings(
    validateAIScore(aiAudit.scores.trust),
    trustFindings.length,
  );

  const productScore = adjustScoreFromFindings(
    validateAIScore(aiAudit.scores.products),
    productFindings.length,
  );

  const journeyScore = adjustScoreFromFindings(
    validateAIScore(aiAudit.scores.journey),
    journeyFindings.length,
  );

  const overallScore = validateAIScore(aiAudit.scores.overall);

  return {
    storeUrl: data.storeUrl,

    overallScore,

    executiveSummary: aiAudit.executiveSummary || {
      headline: "Store Analysis Complete",

      overview:
        "AI analysis identified conversion opportunities across trust, product confidence, and customer journey.",

      biggestOpportunity:
        "Improve customer confidence by reducing buying friction.",

      conversionRisk:
        "Visitors may hesitate when trust signals, product clarity, or purchase guidance are unclear.",
    },

    aiScoreAnalysis: {
      trustScore,

      productScore,

      journeyScore,

      overallScore,

      scoringReason:
        aiAudit.scores.reasoning ||
        "Score generated from ecommerce customer experience analysis.",
    },

    sections: {
      trust: {
        score: trustScore,

        strengths: aiAudit.trust?.strengths?.length
          ? aiAudit.trust.strengths
          : trustAnalysis.strengths,

        weaknesses: aiAudit.trust?.weaknesses?.length
          ? aiAudit.trust.weaknesses
          : trustAnalysis.weaknesses,

        findings: trustFindings,
      },

      products: {
        score: productScore,

        strengths: aiAudit.products?.strengths?.length
          ? aiAudit.products.strengths
          : productAnalysis.strengths,

        weaknesses: aiAudit.products?.weaknesses?.length
          ? aiAudit.products.weaknesses
          : productAnalysis.weaknesses,

        findings: productFindings,
      },

      journey: {
        score: journeyScore,

        insights: aiAudit.journey?.insights?.length
          ? aiAudit.journey.insights
          : journeyAnalysis.insights,

        findings: journeyFindings,
      },
    },

    roadmap: aiAudit.roadmap?.length
      ? aiAudit.roadmap
      : [
          {
            priority: 1,

            title: "Strengthen Trust Foundation",

            problem: "Customers need stronger reassurance before purchasing.",

            impact: "Improves confidence and reduces purchase hesitation.",

            recommendation:
              "Add stronger reviews, guarantees, policies, and trust messaging.",

            timeframe: "First 30 days",
          },

          {
            priority: 2,

            title: "Improve Product Confidence",

            problem:
              "Visitors may lack enough information to make buying decisions.",

            impact: "Helps customers understand product value faster.",

            recommendation:
              "Improve product descriptions, benefits, images, and buying guidance.",

            timeframe: "30-60 days",
          },

          {
            priority: 3,

            title: "Optimize Customer Journey",

            problem: "Customers may experience friction before checkout.",

            impact: "Reduces abandonment and improves conversion flow.",

            recommendation:
              "Improve navigation, checkout reassurance, and decision support.",

            timeframe: "60-90 days",
          },
        ],
  };
}
