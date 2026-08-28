import { pdf } from "@react-pdf/renderer";

import AuditPDF from "@/components/pdf/AuditPDF";

import type { PremiumAuditReport } from "@/lib/deepAudit/types";


export async function generatePremiumPDF(
  report: PremiumAuditReport,
) {
  const blob = await pdf(
    <AuditPDF report={report} />
  ).toBlob();


  const arrayBuffer = await blob.arrayBuffer();


  return Buffer.from(arrayBuffer);
}