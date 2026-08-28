import { Text, View } from "@react-pdf/renderer";

import type { AuditFinding } from "@/lib/deepAudit/types";

import { pdfStyles } from "../styles";

import FindingBlock from "./FindingBlock";

export default function SectionBlock({
  title,
  score,
  strengths,
  weaknesses,
  findings,
}: {
  title: string;

  score: number;

  strengths: string[];

  weaknesses: string[];

  findings: AuditFinding[];
}) {
  return (
    <View>
      {/* SECTION HEADER */}

      <Text style={pdfStyles.sectionTitle}>{title}</Text>

      {/* SCORE */}

      <View style={pdfStyles.sectionScoreCard} wrap={false}>
        <Text style={pdfStyles.scoreLabel}>SECTION PERFORMANCE SCORE</Text>

        <View style={pdfStyles.scoreHero}>
          <Text style={pdfStyles.scoreNumber}>{score}</Text>

          <Text style={pdfStyles.scoreSuffix}>/100</Text>
        </View>
      </View>

      {/* STRENGTHS */}

      <View style={pdfStyles.insightCard}>
        <Text style={pdfStyles.insightLabel}>STRENGTHS IDENTIFIED</Text>

        {strengths?.length > 0 ? (
          strengths.map((item, index) => (
            <Text key={index} style={pdfStyles.insightItem}>
              ✓ {item}
            </Text>
          ))
        ) : (
          <Text style={pdfStyles.sectionText}>
            No significant strengths identified.
          </Text>
        )}
      </View>

      {/* OPPORTUNITIES */}

      <View style={pdfStyles.warningCard}>
        <Text style={pdfStyles.warningLabel}>IMPROVEMENT OPPORTUNITIES</Text>

        {weaknesses?.length > 0 ? (
          weaknesses.map((item, index) => (
            <Text key={index} style={pdfStyles.warningItem}>
              ⚠ {item}
            </Text>
          ))
        ) : (
          <Text style={pdfStyles.sectionText}>
            No major opportunities identified.
          </Text>
        )}
      </View>

      {/* FINDINGS */}

      <Text style={pdfStyles.blockTitle}>PRIORITY FINDINGS</Text>

      {findings?.length > 0 ? (
        findings.map((finding, index) => (
          <FindingBlock key={index} finding={finding} />
        ))
      ) : (
        <Text style={pdfStyles.sectionText}>
          No priority findings detected.
        </Text>
      )}
    </View>
  );
}
