import { Search, ExternalLink } from "lucide-react";

type Lead = {
  id: string;

  storeName: string;

  industry?: string;

  score: number;

  status: string;

  createdAt: string;

  storeUrl: string;
};

export default function LeadTable({ leads }: { leads: Lead[] }) {
  return (
    <section className="dashboard-card">
      <div className="card-header">
        <div>
          <h2>Recent Audit Leads</h2>

          <p>Monitor customer audit activity</p>
        </div>

        <div className="table-search">
          <Search size={16} />

          <input placeholder="Search leads..." />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Store</th>

            <th>Industry</th>

            <th>Score</th>

            <th>Status</th>

            <th>Date</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan={6}>No audit leads yet.</td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id}>
                <td>
                  <a href={`/dashboard/leads/${lead.id}`} className="lead-link">
                    <strong>{lead.storeName}</strong>
                  </a>
                </td>

                <td>{lead.industry || "Ecommerce"}</td>

                <td>
                  <span className="score-badge">{lead.score}/100</span>
                </td>

                <td>
                  <span className="status-badge">{lead.status}</span>
                </td>

                <td>{new Date(lead.createdAt).toLocaleDateString()}</td>

                <td>
                  <a
                    href={lead.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-button"
                  >
                    <ExternalLink size={15} />
                    Website
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
