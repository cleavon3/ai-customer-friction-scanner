import type { DashboardLead, AIUsageStats } from "./types";

export async function getDashboardLeads(): Promise<DashboardLead[]> {
  return [
    {
      id: "1",
      storeName: "GlowSkin Store",
      storeUrl: "glowskin.com",
      ownerEmail: "owner@glowskin.com",
      industry: "Beauty",
      score: 68,
      status: "STRATEGY_CALL_BOOKED",
      createdAt: "26 Aug 2026",
      auditCount: 2,
    },
  ];
}

export async function getAIUsage(): Promise<AIUsageStats> {
  return {
    totalScans: 182,
    successfulReports: 176,
    failedScans: 6,
    apiCost: 42.5,
    averageCost: 0.24,
  };
}
