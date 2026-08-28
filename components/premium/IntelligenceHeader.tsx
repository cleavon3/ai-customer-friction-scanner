import type { PremiumAuditReport } from "@/lib/deepAudit/types";

export default function IntelligenceHeader({
  report,
}: {
  report: PremiumAuditReport;
}) {
  return (
    <div className="intelligence-header">
      <span className="eyebrow">PREMIUM AI STORE INTELLIGENCE</span>

      <h1>Conversion Intelligence Report</h1>

      <p>
        Deep analysis of trust, product confidence, customer journey and growth
        opportunities.
      </p>

      <div className="store-badge">{report.storeUrl}</div>
    </div>
  );
}
