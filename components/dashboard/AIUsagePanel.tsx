type AIUsage = {
  id: string;
  model?: string;
  tokens?: number;
  cost?: number;
};

export default function AIUsagePanel({ usage }: { usage: AIUsage[] }) {
  const totalCost = usage.reduce(
    (total, item) => total + Number(item.cost ?? 0),
    0,
  );

  const totalTokens = usage.reduce(
    (total, item) => total + Number(item.tokens ?? 0),
    0,
  );

  return (
    <section className="dashboard-card">
      <div className="card-header">
        <div>
          <h2>AI Usage Intelligence</h2>

          <p>Monitor AI analysis costs and usage.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="dashboard-stat">
          <h3>AI Spend</h3>

          <strong>${totalCost.toFixed(4)}</strong>
        </div>

        <div className="dashboard-stat">
          <h3>Tokens Used</h3>

          <strong>{totalTokens.toLocaleString()}</strong>
        </div>

        <div className="dashboard-stat">
          <h3>AI Reports</h3>

          <strong>{usage.length}</strong>
        </div>
      </div>
    </section>
  );
}
