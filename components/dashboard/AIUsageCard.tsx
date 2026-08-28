import { Activity, FileText, AlertTriangle, Cpu } from "lucide-react";

const aiMetrics = [
  {
    label: "Total AI Scans",
    value: "248",
    description: "Stores analyzed",
    icon: Activity,
  },

  {
    label: "Reports Generated",
    value: "182",
    description: "Premium reports created",
    icon: FileText,
  },

  {
    label: "Failed Analyses",
    value: "6",
    description: "Requires review",
    icon: AlertTriangle,
  },

  {
    label: "AI System Health",
    value: "98%",
    description: "Analysis reliability",
    icon: Cpu,
  },
];

export default function AIUsageCard() {
  return (
    <section className="dashboard-card">
      <div className="card-header">
        <div>
          <h2>AI Usage & System Health</h2>

          <p>Monitor AI analysis performance.</p>
        </div>
      </div>

      <div className="ai-grid">
        {aiMetrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div key={metric.label} className="ai-stat">
              <div className="ai-icon">
                <Icon size={20} />
              </div>

              <span>{metric.label}</span>

              <strong>{metric.value}</strong>

              <p>{metric.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
