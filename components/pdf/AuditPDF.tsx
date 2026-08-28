import { Document, Page } from "@react-pdf/renderer";

import type { PremiumAuditReport } from "@/lib/deepAudit/types";

import { pdfStyles } from "./styles";

import PDFHeader from "./components/PDFHeader";
import ScoreSummary from "./components/ScoreSummary";
import ExecutiveSummary from "./components/ExecutiveSummary";
import SectionBlock from "./components/SectionBlock";
import RoadmapBlock from "./components/RoadmapBlock";
import AuditSnapshot from "./components/AuditSnapshot";
import FinalCTA from "./components/FinalCTA";
import PDFFooter from "./components/PDFFooter";

interface AuditPDFProps {
  report: PremiumAuditReport;
}

export default function AuditPDF({ report }: AuditPDFProps) {
  if (!report) {
    return (
      <Document>
        <Page size="A4" style={pdfStyles.page}></Page>
      </Document>
    );
  }

  return (
    <Document>
      {/* COVER PAGE */}

      <Page size="A4" style={pdfStyles.page}>
        <PDFHeader storeUrl={report.storeUrl} />

        <ScoreSummary
          overallScore={report.overallScore}
          trustScore={report.aiScoreAnalysis?.trustScore ?? 0}
          productScore={report.aiScoreAnalysis?.productScore ?? 0}
          journeyScore={report.aiScoreAnalysis?.journeyScore ?? 0}
        />

        <AuditSnapshot />

        <PDFFooter />
      </Page>

      {/* EXECUTIVE SUMMARY */}

      <Page size="A4" style={pdfStyles.page}>
        <ExecutiveSummary report={report} />

        <PDFFooter />
      </Page>

      {/* TRUST */}

      <Page size="A4" style={pdfStyles.page}>
        <SectionBlock
          title="Trust & Credibility Analysis"
          score={report.sections.trust.score}
          strengths={report.sections.trust.strengths}
          weaknesses={report.sections.trust.weaknesses}
          findings={report.sections.trust.findings}
        />

        <PDFFooter />
      </Page>

      {/* PRODUCT */}

      <Page size="A4" style={pdfStyles.page}>
        <SectionBlock
          title="Product Confidence Analysis"
          score={report.sections.products.score}
          strengths={report.sections.products.strengths}
          weaknesses={report.sections.products.weaknesses}
          findings={report.sections.products.findings}
        />

        <PDFFooter />
      </Page>

      {/* CUSTOMER JOURNEY */}

      <Page size="A4" style={pdfStyles.page}>
        <SectionBlock
          title="Customer Journey Analysis"
          score={report.sections.journey.score}
          strengths={report.sections.journey.insights}
          weaknesses={[]}
          findings={report.sections.journey.findings}
        />

        <PDFFooter />
      </Page>

      {/* ROADMAP */}

      {report.roadmap && report.roadmap.length > 0 && (
        <Page size="A4" style={pdfStyles.page}>
          <RoadmapBlock roadmap={report.roadmap} />

          <PDFFooter />
        </Page>
      )}

      {/* CTA */}

      <Page size="A4" style={pdfStyles.page}>
        <FinalCTA />

        <PDFFooter />
      </Page>
    </Document>
  );
}
