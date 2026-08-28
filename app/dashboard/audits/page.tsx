import { getDashboardLeads } from "@/lib/dashboard/dashboardQueries";

import "../dashboard.css";

export default async function AuditsPage() {
  const leads = await getDashboardLeads();

  const audits = leads.filter((lead) => lead.audits && lead.audits.length > 0);

  return (
    <main className="dashboard">
      <section className="dashboard-card">
        <div className="card-header">
          <div>
            <h1>Audit Reports</h1>

            <p>Review completed AI customer friction audits.</p>
          </div>
        </div>

        <div className="audit-history">
          {audits.length === 0 ? (
            <p>No completed audits yet.</p>
          ) : (
            audits.map((lead) => (
              <div key={lead.id} className="audit-item">
                <div>
                  <strong>{lead.storeName}</strong>

                  <p>{lead.industry || "Ecommerce"}</p>
                </div>

                <div className="audit-score">
                  <strong>{lead.score}/100</strong>

                  <span>{lead.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
