type Props = {
  leads: any[];
};

export default function RevenueMetrics({ leads }: Props) {
  const totalLeads = leads.length;

  const auditsCompleted = leads.filter(
    (lead) => lead.audits?.length > 0,
  ).length;

  const strategyCalls = leads.filter(
    (lead) => lead.status === "STRATEGY_CALL_BOOKED",
  ).length;

  const paidAudits = leads.filter(
    (lead) => lead.status === "AUDIT_PURCHASED",
  ).length;

  const clients = leads.filter(
    (lead) => lead.status === "IMPLEMENTATION_CLIENT",
  ).length;

  const conversionRate =
    totalLeads === 0 ? 0 : Math.round((clients / totalLeads) * 100);

  const pipelineValue = (paidAudits * 500 + clients * 3000).toLocaleString();

  return (
    <section className="stats-grid">
      <div className="dashboard-stat">
        <h3>Total Leads</h3>

        <strong>{totalLeads}</strong>
      </div>

      <div className="dashboard-stat">
        <h3>Audits Completed</h3>

        <strong>{auditsCompleted}</strong>
      </div>

      <div className="dashboard-stat">
        <h3>Strategy Calls</h3>

        <strong>{strategyCalls}</strong>
      </div>

      <div className="dashboard-stat">
        <h3>Pipeline Value</h3>

        <strong>${pipelineValue}</strong>
      </div>

      <div className="dashboard-stat">
        <h3>Conversion Rate</h3>

        <strong>{conversionRate}%</strong>
      </div>
    </section>
  );
}
