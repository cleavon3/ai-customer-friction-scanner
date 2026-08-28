import type { AuditFinding } from "@/lib/deepAudit/types";

export default function OpportunityCard({
  finding,
}: {
  finding: AuditFinding;
}) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-top">
        <span className={`priority ${finding.priority.toLowerCase()}`}>
          {finding.priority} Priority
        </span>
      </div>

      <div className="opportunity-title">
        <h3>{finding.title}</h3>
      </div>

      <div className="opportunity-grid">
        <div className="opportunity-block">
          <span>THE ISSUE</span>

          <p>{finding.description}</p>
        </div>

        <div className="opportunity-block">
          <span>BUSINESS IMPACT</span>

          <p>{finding.impact}</p>
        </div>

        <div className="opportunity-block action">
          <span>RECOMMENDED ACTION</span>

          <p>{finding.recommendation}</p>
        </div>
      </div>
    </article>
  );
}
