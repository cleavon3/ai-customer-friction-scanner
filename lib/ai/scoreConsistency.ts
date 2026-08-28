export function adjustScoreFromFindings(
  score: number,
  findingsCount: number,
): number {
  let adjustedScore = score;

  if (findingsCount >= 3) {
    adjustedScore -= 15;
  } else if (findingsCount === 2) {
    adjustedScore -= 10;
  } else if (findingsCount === 1) {
    adjustedScore -= 5;
  }

  return Math.max(0, Math.min(100, Math.round(adjustedScore)));
}
