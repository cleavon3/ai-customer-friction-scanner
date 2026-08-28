import DashboardHeader from "@/components/dashboard/DashboardHeader";

import RevenueMetrics from "@/components/dashboard/RevenueMetrics";

import AIUsagePanel from "@/components/dashboard/AIUsagePanel";

import StatCard from "@/components/dashboard/StatCard";

import LeadTable from "@/components/dashboard/LeadTable";

import PipelineBoard from "@/components/dashboard/PipelineBoard";

import AuditHistory from "@/components/dashboard/AuditHistory";

import AIUsageCard from "@/components/dashboard/AIUsageCard";

import ConversionIntelligence from "@/components/dashboard/ConversionIntelligence";

import { createClient } from "@/lib/supabase/server";

import { getDashboardLeads } from "@/lib/dashboard/dashboardQueries";

import { getAIUsage } from "@/lib/dashboard/getAIUsage";

import "./dashboard.css";

export default async function DashboardPage() {
  const leads = await getDashboardLeads();

  const aiUsage = await getAIUsage();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const totalLeads = leads.length;

  const auditsCompleted = leads.filter(
    (lead) => lead.audits && lead.audits.length > 0,
  ).length;

  const strategyCalls = leads.filter(
    (lead) => lead.status === "STRATEGY_CALL_BOOKED",
  ).length;

  const paidAudits = leads.filter(
    (lead) => lead.status === "AUDIT_PURCHASED",
  ).length;

  return (
    <main className="dashboard">
      {/* HEADER */}

      <DashboardHeader userEmail={user?.email} />

      {/* REVENUE INTELLIGENCE */}

      <RevenueMetrics leads={leads} />

      {/* AI COST INTELLIGENCE */}

      <AIUsagePanel usage={aiUsage} />

      {/* KPI SUMMARY */}

      <section className="stats-grid">
        <StatCard
          title="Total Leads"
          value={totalLeads}
          description="Customer scans received"
          type="leads"
        />

        <StatCard
          title="Audits Completed"
          value={auditsCompleted}
          description="AI reports generated"
          type="audits"
        />

        <StatCard
          title="Strategy Calls"
          value={strategyCalls}
          description="Appointments booked"
          type="calls"
        />

        <StatCard
          title="Paid Audits"
          value={paidAudits}
          description="Converted customers"
          type="revenue"
        />
      </section>

      {/* CRM LEADS */}

      <LeadTable leads={leads} />

      {/* SALES PIPELINE */}

      <PipelineBoard leads={leads} />

      {/* AUDIT HISTORY */}

      <AuditHistory audits={leads} />

      {/* CONVERSION INTELLIGENCE */}

      <ConversionIntelligence />

      {/* AI ACTIVITY */}

      <AIUsageCard />
    </main>
  );
}
