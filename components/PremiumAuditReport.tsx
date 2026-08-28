"use client";

import IntelligenceHeader from "./premium/IntelligenceHeader";
import PremiumDashboard from "./premium/PremiumDashboard";
import ScoreCard from "./premium/ScoreCard";
import OpportunityCard from "./premium/OpportunityCard";
import RoadmapCard from "./premium/RoadmapCard";

import type {
  PremiumAuditReport as AuditReport,
  AuditFinding,
} from "@/lib/deepAudit/types";

export default function PremiumAuditReport({
  report,
  pdfUrl,
}: {
  report: AuditReport;
  pdfUrl?: string;
}) {
  const trust = report.sections?.trust;
  const products = report.sections?.products;
  const journey = report.sections?.journey;

  if (!trust || !products || !journey) {
    return (
      <section className="friction-report premium-audit">
        <h2>Preparing your premium audit...</h2>

        <p>The report structure is incomplete. Please refresh and try again.</p>
      </section>
    );
  }

  async function handleExportPDF() {
    const { exportReportPDF } = await import("@/lib/pdf/exportReport");

    await exportReportPDF(report);
  }

  return (
    <section className="friction-report premium-audit">
      {/* CUSTOMER DELIVERY HEADER */}

      <section className="audit-delivery-card">
        <span className="cta-label">PREMIUM AUDIT COMPLETE</span>

        <h2>Your Shopify Intelligence Report Is Ready</h2>

        <p>
          Your AI conversion audit has been completed. A PDF copy has also been
          sent to your email.
        </p>

        <div className="audit-meta">
          <div>
            <strong>Store</strong>

            <span>{report.storeUrl}</span>
          </div>

          <div>
            <strong>Score</strong>

            <span>{report.overallScore}/100</span>
          </div>
        </div>

        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="report-button"
          >
            Download Premium PDF
          </a>
        )}
      </section>

      {/* WEBSITE HEADER */}

      <IntelligenceHeader report={report} />

      {/* WEBSITE DASHBOARD */}

      <PremiumDashboard report={report} />

      {/* SCORE CARDS */}

      <section className="category-grid">
        <ScoreCard
          title="Trust & Credibility"
          score={trust.score}
          description="Customer confidence, credibility signals and purchase reassurance."
        />

        <ScoreCard
          title="Product Confidence"
          score={products.score}
          description="How effectively products help visitors make buying decisions."
        />

        <ScoreCard
          title="Customer Journey"
          score={journey.score}
          description="How easily visitors move from discovery to purchase."
        />
      </section>

      {/* TRUST */}

      <AuditSection
        title="Trust & Credibility Analysis"
        strengths={trust.strengths}
        weaknesses={trust.weaknesses}
        findings={trust.findings}
      />

      {/* PRODUCTS */}

      <AuditSection
        title="Product Confidence Analysis"
        strengths={products.strengths}
        weaknesses={products.weaknesses}
        findings={products.findings}
      />

      {/* JOURNEY */}

      <section className="audit-detail-card">
        <h3>Customer Journey Analysis</h3>

        {journey.insights?.map((item, index) => (
          <p key={index}>✓ {item}</p>
        ))}

        <h4>Journey Opportunities</h4>

        {journey.findings?.map((finding, index) => (
          <OpportunityCard key={index} finding={finding} />
        ))}
      </section>

      {/* ROADMAP */}

      {report.roadmap && report.roadmap.length > 0 && (
        <RoadmapCard roadmap={report.roadmap} />
      )}

      {/* EXPORT */}

      <div className="audit-cta">
        <span className="cta-label">NEXT STEP</span>

        <h3>Turn Insights Into Store Improvements</h3>

        <p>
          Use this intelligence roadmap to prioritize changes that improve
          customer confidence and reduce buying friction.
        </p>

        <button className="report-button" onClick={handleExportPDF}>
          Export My Intelligence Report
        </button>
      </div>
    </section>
  );
}

function AuditSection({
  title,
  strengths,
  weaknesses,
  findings,
}: {
  title: string;
  strengths: string[];
  weaknesses: string[];
  findings: AuditFinding[];
}) {
  return (
    <section className="audit-detail-card">
      <h3>{title}</h3>

      <div className="audit-columns">
        <div>
          <h4>Strengths</h4>

          {strengths?.length > 0 ? (
            strengths.map((item, index) => <p key={index}>✓ {item}</p>)
          ) : (
            <p>No major strengths detected.</p>
          )}
        </div>

        <div>
          <h4>Opportunities</h4>

          {weaknesses?.length > 0 ? (
            weaknesses.map((item, index) => <p key={index}>⚠ {item}</p>)
          ) : (
            <p>No major issues detected.</p>
          )}
        </div>
      </div>

      <h4 className="findings-title">Priority Opportunities</h4>

      {findings?.length > 0 ? (
        findings.map((finding, index) => (
          <OpportunityCard key={index} finding={finding} />
        ))
      ) : (
        <p>No priority findings detected.</p>
      )}
    </section>
  );
}
