type RoadmapItem = {
  priority: number;

  title: string;

  problem: string;

  impact: string;

  recommendation: string;

  timeframe: string;
};

export default function AIRoadmap({ roadmap }: { roadmap: RoadmapItem[] }) {
  if (!roadmap || roadmap.length === 0) {
    return null;
  }

  return (
    <section className="dashboard-card">
      <div className="card-header">
        <div>
          <h2>AI Growth Roadmap</h2>

          <p>Recommended actions to reduce customer friction.</p>
        </div>
      </div>

      <div className="roadmap-list">
        {roadmap.map((item) => (
          <div key={item.priority} className="roadmap-card">
            <div className="roadmap-number">{item.priority}</div>

            <div>
              <h3>{item.title}</h3>

              <p>
                <strong>Problem:</strong> {item.problem}
              </p>

              <p>
                <strong>Impact:</strong> {item.impact}
              </p>

              <p>
                <strong>Recommendation:</strong> {item.recommendation}
              </p>

              <span>Timeline: {item.timeframe}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
