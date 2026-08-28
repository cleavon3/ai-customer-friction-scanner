import type { DeepAuditData } from "@/lib/deepAudit/types";

export function createAuditContext(data: DeepAuditData) {
  return {
    storeUrl: data.storeUrl,

    homepage: data.pages.homepage.slice(0, 2000),

    storeSignals: data.storeSignals,

    productAnalysis: data.productAnalysis,

    customerJourney: data.customerJourney,

    productCount: data.pages.products.length,

    policyPages: data.pages.policies,
  };
}
