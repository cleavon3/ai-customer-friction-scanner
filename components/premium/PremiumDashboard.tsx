import type { PremiumAuditReport } from "@/lib/deepAudit/types";

export default function PremiumDashboard({
  report,
}: {
  report: PremiumAuditReport;
}) {
  const summary = report.executiveSummary;

  const score = report.overallScore;

  const getScoreStatus = () => {
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
  };

  return (
    <section className="premium-dashboard">
      {/* REPORT HEADER */}

      <div className="dashboard-header">
        <span className="eyebrow">AI STORE INTELLIGENCE REPORT</span>

        <h1>Conversion Intelligence Analysis</h1>

        <p>
          Deep analysis of trust signals, product confidence, customer journey
          friction and growth opportunities.
        </p>

        <div className="store-badge">{report.storeUrl}</div>
      </div>

      {/* HEALTH SCORE */}

      <div className="health-score-card">
        <div className="score-main">
          <span>Conversion Health Score</span>

          <strong>
            {score}

            <small>/100</small>
          </strong>

          <label>{getScoreStatus()}</label>
        </div>

        <div className="score-analysis">
          <h4>Intelligence Assessment</h4>

          <p>
            {report.aiScoreAnalysis?.scoringReason ||
              "Score generated from customer experience analysis."}
          </p>
        </div>
      </div>

      {/* EXECUTIVE INTELLIGENCE */}

      <div className="summary-card">
        <span className="section-label">EXECUTIVE INTELLIGENCE</span>

        <h2>{summary?.headline || "Store Conversion Analysis Complete"}</h2>

        <p className="summary-overview">
          {summary?.overview ||
            "Your store analysis has identified key opportunities to improve customer confidence and conversion performance."}
        </p>

        <div className="summary-grid">
          <div className="summary-box">
            <h4>Biggest Opportunity</h4>

            <p>
              {summary?.biggestOpportunity ||
                "Improve trust signals and customer decision confidence."}
            </p>
          </div>

          <div className="summary-box">
            <h4>Conversion Risk</h4>

            <p>
              {summary?.conversionRisk ||
                "Customer hesitation may reduce purchase completion."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
