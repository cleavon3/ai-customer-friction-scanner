import AIUsagePanel from "@/components/dashboard/AIUsagePanel";

import { getAIUsage } from "@/lib/dashboard/getAIUsage";

import "../dashboard.css";

export default async function AIUsagePage() {
  const aiUsage = await getAIUsage();

  return (
    <main className="dashboard">
      <section className="dashboard-card">
        <div className="card-header">
          <div>
            <h1>AI Usage Intelligence</h1>

            <p>Monitor AI analysis costs, tokens and report generation.</p>
          </div>
        </div>
      </section>

      <AIUsagePanel usage={aiUsage} />
    </main>
  );
}
