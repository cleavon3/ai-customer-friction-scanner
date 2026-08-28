import { createClient } from "@/lib/supabase/server";

import LeadHeader from "@/components/dashboard/lead/LeadHeader";

import CustomerTimeline from "@/components/dashboard/lead/CustomerTimeline";

import AIFindings from "@/components/dashboard/lead/AIFindings";

import AIRoadmap from "@/components/dashboard/lead/AIRoadmap";

import LeadActions from "@/components/dashboard/lead/LeadActions";

export default async function LeadDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const supabase = await createClient();

  const { data: lead } = await supabase

    .from("leads")

    .select(
      `
        *,
        reports(*)
        `,
    )

    .eq("id", params.id)

    .single();

  if (!lead) {
    return (
      <main className="dashboard">
        <h1>Lead not found</h1>
      </main>
    );
  }

  const latestReport = lead.reports?.[0];

  return (
    <main className="dashboard">
      {/* LEAD PROFILE */}

      <LeadHeader lead={lead} />

      {/* CUSTOMER JOURNEY */}

      <CustomerTimeline status={lead.status} />

      {/* ACTIONS */}

      <LeadActions leadId={lead.id} status={lead.status} />

      {/* AUDIT REPORTS */}

      <section className="dashboard-card">
        <h2>Audit Reports</h2>

        {lead.reports?.length === 0 ? (
          <p>No audit reports available.</p>
        ) : (
          lead.reports?.map((report: any) => (
            <div key={report.id} className="audit-report-item">
              <p>
                Score:
                <strong>{report.score}/100</strong>
              </p>

              <p>
                Created:
                {new Date(report.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </section>

      {/* AI FINDINGS */}

      {latestReport && <AIFindings reportData={latestReport.report_data} />}

      {/* AI ROADMAP */}

      {latestReport && (
        <AIRoadmap roadmap={latestReport.report_data?.roadmap || []} />
      )}
    </main>
  );
}
