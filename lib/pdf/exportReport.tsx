import { pdf } from "@react-pdf/renderer";

export async function exportReportPDF(report: any) {
  try {
    const AuditPDF = (await import("@/components/pdf/AuditPDF")).default;

    if (!AuditPDF) {
      throw new Error("AuditPDF component failed to load");
    }

    const blob = await pdf(<AuditPDF report={report} />).toBlob();

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "premium-audit-report.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PDF EXPORT ERROR:", error);

    throw error;
  }
}
