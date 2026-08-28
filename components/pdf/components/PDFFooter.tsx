import { Text, View } from "@react-pdf/renderer";

import { pdfStyles } from "../styles";

export default function PDFFooter() {
  return (
    <View style={pdfStyles.footer} fixed>
      <Text style={pdfStyles.footerText}>Skill Digital Solutions</Text>

      <Text style={pdfStyles.footerText}>
        AI Customer Friction Scanner | Store Intelligence Report
      </Text>
    </View>
  );
}
