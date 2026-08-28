import { getDashboardLeads } from "@/lib/dashboard/dashboardQueries";

import LeadTable from "@/components/dashboard/LeadTable";

import "../dashboard.css";

export default async function LeadsPage() {
  const leads = await getDashboardLeads();

  return (
    <main className="dashboard">
      <section className="dashboard-card">
        <div className="card-header">
          <div>
            <h1>Leads</h1>

            <p>Manage customer audit leads and opportunities.</p>
          </div>
        </div>
      </section>

      <LeadTable leads={leads} />
    </main>
  );
}
