import Link from "next/link";

import { FileText } from "lucide-react";

type Audit = {
  id: string;

  storeName: string;

  score: number;

  status: string;

  createdAt: string;

  audits?: {
    id: string;
    score: number;
    created_at: string;
  }[];
};

export default function AuditHistory({ audits }: { audits: Audit[] }) {
  return (
    <section className="dashboard-card">
      <div className="card-header">
        <div>
          <h2>Audit History</h2>

          <p>Recent AI analysis activity.</p>
        </div>
      </div>

      <div className="audit-history">
        {audits.length === 0 ? (
          <p>No audits completed yet.</p>
        ) : (
          audits.map((lead) => (
            <Link
              key={lead.id}
              href={`/dashboard/leads/${lead.id}`}
              className="audit-item"
            >
              <div>
                <strong>{lead.storeName}</strong>

                <p>{new Date(lead.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="audit-score">
                <span>
                  <FileText size={15} />

                  {lead.status}
                </span>

                <strong>{lead.score}/100</strong>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
