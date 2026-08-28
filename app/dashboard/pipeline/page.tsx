import { getDashboardLeads } from "@/lib/dashboard/dashboardQueries";

import PipelineBoard from "@/components/dashboard/PipelineBoard";

import "../dashboard.css";

export default async function PipelinePage() {
  const leads = await getDashboardLeads();

  return (
    <main className="dashboard">
      <section className="dashboard-card">
        <div className="card-header">
          <div>
            <h1>Sales Pipeline</h1>

            <p>Track customer movement from first scan to implementation.</p>
          </div>
        </div>
      </section>

      <PipelineBoard leads={leads} />
    </main>
  );
}
