import { Text, View } from "@react-pdf/renderer";

import { pdfStyles } from "../styles";

export default function AuditSnapshot() {
  return (
    <View style={pdfStyles.snapshotCard}>
      <Text style={pdfStyles.snapshotLabel}>AUDIT SNAPSHOT</Text>

      <Text style={pdfStyles.snapshotTitle}>Areas Analysed</Text>

      <Text style={pdfStyles.snapshotItem}>✓ Trust & Credibility</Text>

      <Text style={pdfStyles.snapshotItem}>✓ Product Confidence</Text>

      <Text style={pdfStyles.snapshotItem}>✓ Customer Journey</Text>

      <View style={pdfStyles.snapshotDivider} />

      <Text style={pdfStyles.snapshotTitle}>Primary Objective</Text>

      <Text style={pdfStyles.snapshotText}>
        Identify conversion barriers preventing visitors from becoming confident
        buyers.
      </Text>
    </View>
  );
}
