import { Text, View } from "@react-pdf/renderer";

import type { RoadmapItem } from "@/lib/deepAudit/types";

import { pdfStyles } from "../styles";

export default function RoadmapBlock({ roadmap }: { roadmap: RoadmapItem[] }) {
  return (
    <View>
      <Text style={pdfStyles.sectionTitle}>
        30-Day Conversion Growth Roadmap
      </Text>

      <Text style={pdfStyles.sectionText}>
        A prioritized action plan designed to reduce customer friction,
        strengthen trust signals, and improve store conversion performance.
      </Text>

      {roadmap?.map((item) => (
        <View key={item.priority} style={pdfStyles.roadmapCard}>
          <Text style={pdfStyles.roadmapNumber}>
            {String(item.priority).padStart(2, "0")}
          </Text>

          <Text style={pdfStyles.roadmapTitle}>{item.title}</Text>

          <View style={pdfStyles.findingSection}>
            <Text style={pdfStyles.findingLabel}>Problem</Text>

            <Text style={pdfStyles.findingText}>{item.problem}</Text>
          </View>

          <View style={pdfStyles.findingSection}>
            <Text style={pdfStyles.findingLabel}>Expected Impact</Text>

            <Text style={pdfStyles.findingText}>{item.impact}</Text>
          </View>

          <View style={pdfStyles.findingSection}>
            <Text style={pdfStyles.findingLabel}>Recommended Action</Text>

            <Text style={pdfStyles.findingText}>{item.recommendation}</Text>
          </View>

          <View style={pdfStyles.findingSection}>
            <Text style={pdfStyles.findingLabel}>Timeline</Text>

            <Text style={pdfStyles.findingText}>{item.timeframe}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
