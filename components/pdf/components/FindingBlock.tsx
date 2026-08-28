import { Text, View } from "@react-pdf/renderer";

import type { AuditFinding } from "@/lib/deepAudit/types";

import { pdfStyles } from "../styles";

export default function FindingBlock({ finding }: { finding: AuditFinding }) {
  return (
    <View style={pdfStyles.findingCard} wrap={false}>
      {/* PRIORITY */}

      <Text style={pdfStyles.findingPriority}>{finding.priority} IMPACT</Text>

      {/* TITLE */}

      <Text style={pdfStyles.findingTitle}>{finding.title}</Text>

      {/* WHY THIS MATTERS */}

      <View style={pdfStyles.findingSection}>
        <Text style={pdfStyles.findingLabel}>WHY THIS MATTERS</Text>

        <Text style={pdfStyles.findingText}>{finding.description}</Text>
      </View>

      {/* BUSINESS IMPACT */}

      <View style={pdfStyles.findingSection}>
        <Text style={pdfStyles.findingLabel}>BUSINESS IMPACT</Text>

        <Text style={pdfStyles.findingText}>{finding.impact}</Text>
      </View>

      {/* RECOMMENDED ACTION */}

      <View style={pdfStyles.findingSection}>
        <Text style={pdfStyles.findingLabel}>RECOMMENDED ACTION</Text>

        <Text style={pdfStyles.findingText}>{finding.recommendation}</Text>
      </View>
    </View>
  );
}
