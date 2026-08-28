export function validateAIScore(score: number | undefined | null): number {
  if (typeof score !== "number") {
    return 0;
  }

  if (score > 100) {
    return 100;
  }

  if (score < 0) {
    return 0;
  }

  return Math.round(score);
}
