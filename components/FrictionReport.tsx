"use client";

type Issue = {
  title: string;
  problem: string;
  impact: string;
  recommendation: string;
};

type Report = {
  score: number;

  categories: {
    trust: number;
    clarity: number;
    productConfidence: number;
    buyingGuidance: number;
  };

  issues: Issue[];
};

function getRiskStatus(score: number) {
  if (score >= 80) {
    return {
      label: "Strong Conversion Foundation",
      icon: "✓",
      className: "low-risk",
    };
  }

  if (score >= 60) {
    return {
      label: "Moderate Conversion Friction",
      icon: "⚠",
      className: "medium-risk",
    };
  }

  return {
    label: "High Conversion Leakage",
    icon: "⚠",
    className: "high-risk",
  };
}

export default function FrictionReport({ report }: { report: Report }) {
  const risk = getRiskStatus(report.score);

  const priorityIssues = report.issues.slice(0, 3);

  const remainingIssues = Math.max(report.issues.length - 3, 0);

  return (
    <section id="friction-result" className="friction-report">
      {/* HEADER */}

      <div className="report-header">
        <span className="eyebrow">AI CUSTOMER FRICTION REPORT</span>

        <h2>Your Shopify Conversion Leak Report</h2>

        <p>
          Your store analysis is complete. We identified the biggest barriers
          that may prevent visitors from becoming buyers.
        </p>
      </div>

      {/* SCORE */}

      <div className="score-circle">
        <strong>{report.score}</strong>

        <span>/100</span>
      </div>

      {/* RISK STATUS */}

      <div className={`risk-badge ${risk.className}`}>
        {risk.icon} {risk.label}
      </div>

      {/* EXPLANATION */}

      <div className="impact-box">
        <h3>What This Means</h3>

        <p>
          Your store has conversion opportunities related to customer trust,
          product confidence, and purchase decision-making.
        </p>
      </div>

      {/* CATEGORY SCORES */}

      <h3 className="section-title">Customer Confidence Breakdown</h3>

      <div className="category-grid">
        <div>
          <span>Trust Signals</span>

          <strong>{report.categories.trust}/100</strong>
        </div>

        <div>
          <span>Customer Clarity</span>

          <strong>{report.categories.clarity}/100</strong>
        </div>

        <div>
          <span>Product Confidence</span>

          <strong>{report.categories.productConfidence}/100</strong>
        </div>

        <div>
          <span>Buying Guidance</span>

          <strong>{report.categories.buyingGuidance}/100</strong>
        </div>
      </div>

      {/* PRIORITY ISSUES */}

      <h3 className="section-title">Top Conversion Opportunities</h3>

      <div className="issues">
        {priorityIssues.map((issue, index) => (
          <article key={index} className="issue-card">
            <span className="issue-number">
              Priority {String(index + 1).padStart(2, "0")}
            </span>

            <h4>{issue.title}</h4>

            <div className="issue-section">
              <strong>Why customers hesitate</strong>

              <p>{issue.problem}</p>
            </div>

            <div className="issue-section">
              <strong>Business impact</strong>

              <p>{issue.impact}</p>
            </div>

            <div className="issue-section recommendation">
              <strong>Recommended action</strong>

              <p>{issue.recommendation}</p>
            </div>
          </article>
        ))}
      </div>

      {/* REMAINING OPPORTUNITIES */}

      {remainingIssues > 0 && (
        <div className="additional-findings">
          <strong>
            + {remainingIssues} additional conversion opportunities discovered
          </strong>

          <p>
            Your complete audit reveals every friction point and provides a
            detailed optimization roadmap.
          </p>
        </div>
      )}

      {/* PREMIUM CTA */}

      <div className="audit-cta">
        <span className="cta-label">NEXT STEP</span>

        <h3>Turn These Problems Into Growth Opportunities</h3>

        <p>
          Get the complete store optimization plan with deeper recommendations
          across your homepage, product pages, trust signals, and customer
          journey.
        </p>

        <div className="audit-benefits">
          <span>✓ Homepage conversion improvements</span>

          <span>✓ Product page optimization strategy</span>

          <span>✓ Trust and credibility upgrades</span>

          <span>✓ Customer journey improvement roadmap</span>
        </div>

        <a href="/store-audit" className="report-button">
          Get Complete Store Audit
        </a>
      </div>
    </section>
  );
}
