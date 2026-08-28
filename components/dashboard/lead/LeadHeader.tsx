type Lead = {
  store_url: string;
  email: string;
  category: string;
  friction_score: number;
  status: string;
};

export default function LeadHeader({ lead }: { lead: Lead }) {
  return (
    <section className="dashboard-card lead-header">
      <h1>{lead.store_url}</h1>

      <p>{lead.email}</p>

      <div className="lead-meta">
        <span>
          Industry:
          {lead.category || "Ecommerce"}
        </span>

        <span>
          Score:
          <strong>{lead.friction_score}/100</strong>
        </span>

        <span>
          Status:
          {lead.status}
        </span>
      </div>
    </section>
  );
}
