import { createClient } from "@/lib/supabase/server";

import type { PremiumAuditReport } from "@/lib/deepAudit/types";

export async function saveAuditResult(
  report: PremiumAuditReport,
  ownerEmail: string,
  industry = "Ecommerce",
  auditId: string,
  pdfUrl?: string,
) {
  const supabase = await createClient();

  /*
  =========================
  CREATE LEAD
  =========================
  */

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .insert({
      email: ownerEmail,

      store_url: report.storeUrl,

      category: industry,

      friction_score: report.overallScore,

      status: "AUDIT_PURCHASED",
    })
    .select()
    .single();

  if (leadError) {
    console.error("LEAD SAVE ERROR:", leadError);

    throw leadError;
  }

  /*
  =========================
  SAVE REPORT
  =========================
  */

  const { data: auditReport, error: reportError } = await supabase
    .from("reports")
    .insert({
      audit_id: auditId,

      lead_id: lead.id,

      score: report.overallScore,

      pdf_url: pdfUrl ?? null,

      report_data: {
        executiveSummary: report.executiveSummary,

        sections: report.sections,

        roadmap: report.roadmap,
      },
    })
    .select()
    .single();

  if (reportError) {
    console.error("REPORT SAVE ERROR:", reportError);

    throw reportError;
  }

  console.log("REPORT SAVED:", auditReport.id);

  return {
    lead,
    auditReport,
  };
}
