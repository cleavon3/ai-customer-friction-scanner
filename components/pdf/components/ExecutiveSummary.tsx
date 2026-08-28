import { Text, View } from "@react-pdf/renderer";

import type { PremiumAuditReport } from "@/lib/deepAudit/types";

import { pdfStyles } from "../styles";

export default function ExecutiveSummary({
  report,
}: {
  report: PremiumAuditReport;
}) {
  const summary =
    typeof report.executiveSummary === "string"
      ? {
          overview: report.executiveSummary,

          biggestOpportunity:
            "Improve customer confidence and reduce buying friction.",

          conversionRisk:
            "Visitors may hesitate due to unresolved purchase barriers.",
        }
      : report.executiveSummary;

  return (
    <View style={pdfStyles.summaryCard}>
      <Text style={pdfStyles.scoreLabel}>EXECUTIVE INTELLIGENCE SUMMARY</Text>

      <Text style={pdfStyles.summaryTitle}>
        Store Conversion Analysis Complete
      </Text>

      <Text style={pdfStyles.sectionText}>
        {summary?.overview ||
          "The audit identified opportunities to improve customer trust, product confidence, and the overall buying journey."}
      </Text>

      <View style={pdfStyles.summaryHighlight} wrap={false}>
        <Text style={pdfStyles.highlightLabel}>BIGGEST OPPORTUNITY</Text>

        <Text style={pdfStyles.highlightText}>
          {summary?.biggestOpportunity ||
            "Strengthen reassurance signals to increase customer confidence."}
        </Text>
      </View>

      <View style={pdfStyles.summaryRisk} wrap={false}>
        <Text style={pdfStyles.riskLabel}>CONVERSION RISK</Text>

        <Text style={pdfStyles.riskText}>
          {summary?.conversionRisk ||
            "Unclear value communication may create hesitation before purchase."}
        </Text>
      </View>
    </View>
  );
}
