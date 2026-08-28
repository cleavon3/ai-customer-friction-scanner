import { StyleSheet } from "@react-pdf/renderer";

export const pdfStyles = StyleSheet.create({
  /*
  ===============================
  GLOBAL PAGE
  ===============================
  */

  page: {
    paddingTop: 32,
    paddingBottom: 35,
    paddingHorizontal: 35,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
    color: "#111827",
    fontSize: 10,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 8,
    marginBottom: 12,
  },

  /*
  ===============================
  HEADER
  ===============================
  */

  coverHeader: {
    backgroundColor: "#0B1220",
    borderRadius: 12,
    padding: 22,
    marginBottom: 15,
  },

  brandLabel: {
    fontSize: 8,
    color: "#60A5FA",
    fontWeight: "bold",
    letterSpacing: 0.5,
    marginBottom: 12,
  },

  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 9,
    color: "#CBD5E1",
    lineHeight: 1.5,
  },

  storeCard: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 10,
  },

  storeText: {
    fontSize: 10,
    color: "#111827",
    marginBottom: 3,
  },

  /*
  ===============================
  SCORE
  ===============================
  */

  scoreCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },

  sectionScoreCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },

  scoreHero: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },

  scoreLabel: {
    fontSize: 8,
    color: "#64748B",
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 6,
  },

  scoreNumber: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0B1220",
  },

  scoreSuffix: {
    fontSize: 14,
    color: "#64748B",
  },

  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 7,
  },

  scoreRowLabel: {
    fontSize: 9.5,
    color: "#374151",
  },

  /*
===============================
CTA HIGHLIGHT
===============================
*/

  scoreRowValue: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: "#111827",
  },

  ctaButton: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginTop: 15,
    marginBottom: 15,
    textDecoration: "none",
  },

  ctaButtonText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },

  /*
  ===============================
  SECTIONS
  ===============================
  */

  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
    marginTop: 8,
  },

  sectionText: {
    fontSize: 9.5,
    color: "#374151",
    lineHeight: 1.5,
    marginBottom: 6,
  },

  analysisBlock: {
    marginBottom: 12,
  },

  blockTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },

  /*
  ===============================
  INSIGHTS
  ===============================
  */

  insightCard: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#DCFCE7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  insightLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#16A34A",
    letterSpacing: 1,
    marginBottom: 8,
  },

  insightItem: {
    fontSize: 9.5,
    color: "#374151",
    marginBottom: 5,
  },

  warningCard: {
    backgroundColor: "#FFF7ED",
    borderWidth: 1,
    borderColor: "#FED7AA",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },

  warningLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#EA580C",
    letterSpacing: 1,
    marginBottom: 8,
  },

  warningItem: {
    fontSize: 9.5,
    color: "#374151",
    marginBottom: 5,
  },

  /*
  ===============================
  FINDINGS
  ===============================
  */

  findingCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },

  findingPriority: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#2563EB",
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  findingTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 10,
  },

  findingLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#64748B",
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  findingText: {
    fontSize: 9.5,
    color: "#374151",
    lineHeight: 1.55,
    marginBottom: 6,
  },

  findingSection: {
    marginBottom: 8,
  },

  /*
  ===============================
  ROADMAP
  ===============================
  */

  roadmapCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },

  roadmapNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 5,
  },

  roadmapTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  /*
  ===============================
  EXECUTIVE SUMMARY
  ===============================
  */

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },

  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  summaryHighlight: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },

  highlightLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#2563EB",
    letterSpacing: 1,
    marginBottom: 6,
  },

  highlightText: {
    fontSize: 10,
    color: "#1F2937",
    lineHeight: 1.5,
  },

  summaryRisk: {
    backgroundColor: "#FEF2F2",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },

  riskLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#DC2626",
    letterSpacing: 1,
    marginBottom: 6,
  },

  riskText: {
    fontSize: 10,
    color: "#374151",
    lineHeight: 1.5,
  },

  /*
===============================
SCORE BREAKDOWN ROWS
===============================
*/

  scoreStatus: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 10,
  },

  scoreRowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 8,
  },

  scoreDescription: {
    fontSize: 8.5,
    color: "#6B7280",
    marginTop: 3,
  },

  /*
  ===============================
  SNAPSHOT
  ===============================
  */

  snapshotCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    marginTop: 12,
  },

  snapshotLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#2563EB",
    letterSpacing: 1,
    marginBottom: 8,
  },

  snapshotTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 6,
  },

  snapshotItem: {
    fontSize: 9.5,
    color: "#374151",
    marginBottom: 4,
  },

  snapshotDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },

  snapshotText: {
    fontSize: 9.5,
    color: "#374151",
    lineHeight: 1.5,
  },

  /*
  ===============================
  CTA
  ===============================
  */

  ctaCard: {
    backgroundColor: "#0B1220",
    borderRadius: 12,
    padding: 25,
    marginTop: 80,
  },

  ctaLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#60A5FA",
    letterSpacing: 1,
    marginBottom: 12,
  },

  ctaTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },

  ctaText: {
    fontSize: 10,
    color: "#CBD5E1",
    lineHeight: 1.6,
    marginBottom: 10,
  },

  /*
  ===============================
  FOOTER
  ===============================
  */

  footer: {
    position: "absolute",
    bottom: 18,
    left: 35,
    right: 35,

    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",

    paddingTop: 7,

    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerText: {
    fontSize: 8,
    color: "#6B7280",
  },
});
