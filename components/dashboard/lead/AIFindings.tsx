type FindingProps = {
  reportData: any;
};

export default function AIFindings({ reportData }: FindingProps) {
  const sections = reportData?.sections;

  if (!sections) {
    return (
      <section className="dashboard-card">
        <h2>AI Findings</h2>

        <p>No AI findings available yet.</p>
      </section>
    );
  }

  return (
    <section className="dashboard-card">
      <h2>AI Customer Friction Findings</h2>

      <div className="findings-grid">
        <FindingBlock title="Trust & Credibility" data={sections.trust} />

        <FindingBlock title="Product Confidence" data={sections.products} />

        <FindingBlock title="Customer Journey" data={sections.journey} />
      </div>
    </section>
  );
}

function FindingBlock({
  title,

  data,
}: {
  title: string;

  data: any;
}) {
  return (
    <div className="finding-card">
      <h3>{title}</h3>

      <h4>Strengths</h4>

      {data?.strengths?.map((item: string, index: number) => (
        <p key={index}>✓ {item}</p>
      ))}

      <h4>Opportunities</h4>

      {data?.weaknesses?.map((item: string, index: number) => (
        <p key={index}>⚠ {item}</p>
      ))}
    </div>
  );
}
