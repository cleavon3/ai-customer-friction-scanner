import { Text, View } from "@react-pdf/renderer";

import { pdfStyles } from "../styles";

export default function PDFHeader({ storeUrl }: { storeUrl: string }) {
  return (
    <View style={pdfStyles.coverHeader}>
      <Text style={pdfStyles.brandLabel}>AI CUSTOMER FRICTION SCANNER</Text>

      <Text style={pdfStyles.mainTitle}>Store Intelligence Report</Text>

      <Text style={pdfStyles.subtitle}>
        AI-powered analysis of customer trust, product confidence, and
        conversion friction.
      </Text>

      <View style={pdfStyles.storeCard} wrap={false}>
        <Text style={pdfStyles.storeText}>STORE ANALYZED</Text>

        <Text style={pdfStyles.storeText}>{storeUrl}</Text>
      </View>
    </View>
  );
}
