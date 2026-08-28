import { openai } from "./openai";

import { buildAuditPrompt } from "./prompts";

import { createAuditContext } from "./createAuditContext";

import { saveAIUsage } from "@/lib/ai/saveAIUsage";

import type { DeepAuditData, AuditFinding } from "@/lib/deepAudit/types";

export type AIAuditResponse = {
  executiveSummary: {
    headline: string;

    overview: string;

    biggestOpportunity: string;

    conversionRisk: string;
  };

  roadmap: {
    priority: number;

    title: string;

    problem: string;

    impact: string;

    recommendation: string;

    timeframe: string;
  }[];

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

export async function generateAIAudit(
  auditData: DeepAuditData,
): Promise<AIAuditResponse> {
  console.log("CREATING AI AUDIT CONTEXT");

  const context = createAuditContext(auditData);

  console.log("SENDING DATA TO OPENAI");

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",

    max_tokens: 2000,

    response_format: {
      type: "json_object",
    },

    messages: [
      {
        role: "system",

        content: `
You are a senior ecommerce conversion strategist.

Analyze the store data.

Return only valid JSON.

Scores must be realistic.
Do not give perfect scores unless truly exceptional.
`,
      },

      {
        role: "user",

        content: buildAuditPrompt(context),
      },
    ],
  });

  /*
  =========================
  SAVE AI USAGE COST
  =========================
  */

  const usage = response.usage;

  if (usage) {
    const inputTokens = usage.prompt_tokens || 0;

    const outputTokens = usage.completion_tokens || 0;

    const totalTokens = inputTokens + outputTokens;

    await saveAIUsage({
      model: response.model,

      tokens: totalTokens,

      cost: calculateAICost(response.model, inputTokens, outputTokens),
    });
  }

  const content = response.choices[0].message.content;

  if (!content) {
    throw new Error("AI response was empty");
  }

  try {
    const parsed = JSON.parse(content);

    return parsed as AIAuditResponse;
  } catch (error) {
    console.error("AI JSON PARSE ERROR:", error);

    throw new Error("Invalid AI response format");
  }
}

function calculateAICost(
  model: string,
  inputTokens: number,
  outputTokens: number,
) {
  /*
    Approximate GPT-4.1-mini pricing.
    Update if OpenAI pricing changes.
  */

  if (model.includes("gpt-4.1-mini")) {
    const inputCost = (inputTokens / 1_000_000) * 0.4;

    const outputCost = (outputTokens / 1_000_000) * 1.6;

    return Number((inputCost + outputCost).toFixed(6));
  }

  return 0;
}
