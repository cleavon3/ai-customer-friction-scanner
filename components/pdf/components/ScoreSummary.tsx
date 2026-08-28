import { Text, View } from "@react-pdf/renderer";

import { pdfStyles } from "../styles";

export default function ScoreSummary({
  overallScore,
  trustScore,
  productScore,
  journeyScore,
}: {
  overallScore: number;

  trustScore: number;

  productScore: number;

  journeyScore: number;
}) {
  return (
    <View style={pdfStyles.scoreCard}>
      <Text style={pdfStyles.scoreLabel}>CONVERSION HEALTH SCORE</Text>

      <View style={pdfStyles.scoreHero}>
        <Text style={pdfStyles.scoreNumber}>{overallScore}</Text>

        <Text style={pdfStyles.scoreSuffix}>/100</Text>
      </View>

      <Text style={pdfStyles.scoreStatus}>{getScoreStatus(overallScore)}</Text>

      <Text style={pdfStyles.sectionText}>
        Overall assessment of customer trust, product confidence, and purchase
        journey performance.
      </Text>

      <Text style={pdfStyles.sectionTitle}>Performance Breakdown</Text>

      <ScoreRow
        label="Trust & Credibility"
        score={trustScore}
        description="Customer confidence and reassurance signals"
      />

      <ScoreRow
        label="Product Confidence"
        score={productScore}
        description="Product clarity and purchase decision support"
      />

      <ScoreRow
        label="Customer Journey"
        score={journeyScore}
        description="Navigation and conversion flow experience"
      />
    </View>
  );
}

function ScoreRow({
  label,
  score,
  description,
}: {
  label: string;

  score: number;

  description: string;
}) {
  return (
    <View style={pdfStyles.scoreRowCard}>
      <View>
        <Text style={pdfStyles.scoreRowLabel}>{label}</Text>

        <Text style={pdfStyles.scoreDescription}>{description}</Text>
      </View>

      <Text style={pdfStyles.scoreRowValue}>{score}/100</Text>
    </View>
  );
}

function getScoreStatus(score: number) {
  if (score >= 85) {
    return "Excellent Store Experience";
  }

  if (score >= 70) {
    return "Strong Foundation With Opportunities";
  }

  if (score >= 50) {
    return "Needs Conversion Improvement";
  }

  return "High Conversion Risk";
}
