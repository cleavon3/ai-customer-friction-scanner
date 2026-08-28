import type { RoadmapItem } from "@/lib/deepAudit/types";

export default function RoadmapCard({ roadmap }: { roadmap: RoadmapItem[] }) {
  return (
    <section className="roadmap-card">
      <div className="roadmap-header">
        <span className="eyebrow">IMPLEMENTATION ROADMAP</span>

        <h2>30-Day Conversion Growth Plan</h2>

        <p>
          A prioritized execution plan based on your store intelligence
          analysis.
        </p>
      </div>

      <div className="roadmap-timeline">
        {roadmap.map((item, index) => (
          <div key={item.priority} className="roadmap-step">
            <div className="timeline-marker">
              {String(item.priority).padStart(2, "0")}
            </div>

            <div className="roadmap-content">
              <div className="roadmap-title-row">
                <h3>{item.title}</h3>

                <span className="roadmap-timeframe">{item.timeframe}</span>
              </div>

              <div className="roadmap-detail">
                <div>
                  <span>CURRENT CHALLENGE</span>

                  <p>{item.problem}</p>
                </div>

                <div>
                  <span>BUSINESS IMPACT</span>

                  <p>{item.impact}</p>
                </div>

                <div className="recommendation-box">
                  <span>RECOMMENDED ACTION</span>

                  <p>{item.recommendation}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
