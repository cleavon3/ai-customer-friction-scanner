type TimelineProps = {
  status: string;
};

const stages = [
  {
    key: "NEW_LEAD",
    label: "New Lead",
  },

  {
    key: "FREE_SCAN_COMPLETED",
    label: "Free Scan Completed",
  },

  {
    key: "REPORT_SENT",
    label: "Report Sent",
  },

  {
    key: "STRATEGY_CALL_BOOKED",
    label: "Strategy Call Booked",
  },

  {
    key: "AUDIT_PURCHASED",
    label: "Audit Purchased",
  },

  {
    key: "IMPLEMENTATION_CLIENT",
    label: "Implementation Client",
  },
];

export default function CustomerTimeline({ status }: TimelineProps) {
  const currentIndex = stages.findIndex((stage) => stage.key === status);

  return (
    <section className="dashboard-card">
      <h2>Customer Journey</h2>

      <div className="customer-timeline">
        {stages.map((stage, index) => (
          <div
            key={stage.key}
            className={
              index <= currentIndex ? "timeline-step active" : "timeline-step"
            }
          >
            <div className="timeline-dot"></div>

            <span>{stage.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
