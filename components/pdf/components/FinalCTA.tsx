import { Text, View, Link } from "@react-pdf/renderer";

import { pdfStyles } from "../styles";

export default function FinalCTA() {
  return (
    <View style={pdfStyles.ctaCard} wrap={false}>
      <Text style={pdfStyles.ctaLabel}>NEXT STEP</Text>

      <Text style={pdfStyles.ctaTitle}>
        Turn Your Audit Insights Into Growth
      </Text>

      <Text style={pdfStyles.ctaText}>
        Your Store Intelligence Report has identified the key friction points
        affecting customer confidence, purchase decisions, and conversion
        performance.
      </Text>

      <Text style={pdfStyles.ctaText}>
        Book a free strategy call with Skill Digital Solutions to review your
        findings, prioritise improvements, and identify the highest-impact
        opportunities for your store.
      </Text>

      <Link
        src="https://calendly.com/cleavondigital/marketing-ai-growth-strategy-session"
        style={pdfStyles.ctaButton}
      >
        <Text style={pdfStyles.ctaButtonText}>
          BOOK YOUR FREE STRATEGY CALL
        </Text>
      </Link>

      <Text style={pdfStyles.ctaText}>
        Skill Digital Solutions helps businesses improve digital experiences,
        reduce customer friction, and create clearer paths from visitors to
        customers.
      </Text>
    </View>
  );
}
