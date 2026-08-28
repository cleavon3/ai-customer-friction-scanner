import React from "react";

export default function ScoreCard({
  title,
  score,
  description,
}: {
  title: string;

  score: number;

  description: string;
}) {
  function getStatus() {
    if (score >= 85) {
      return "Strong";
    }

    if (score >= 70) {
      return "Healthy";
    }

    if (score >= 50) {
      return "Needs Improvement";
    }

    return "Critical";
  }

  return (
    <div className="premium-score-card">
      <div className="score-card-header">
        <span className="score-category">{title}</span>

        <span
          className={`score-status score-${getStatus()
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {getStatus()}
        </span>
      </div>

      <div className="score-number">
        {score}

        <span>/100</span>
      </div>

      <div className="score-progress">
        <div
          className="score-progress-fill"
          style={{
            width: `${score}%`,
          }}
        />
      </div>

      <p>{description}</p>
    </div>
  );
}
