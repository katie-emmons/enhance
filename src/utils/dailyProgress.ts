const STORAGE_KEY = "enhance-daily-progress";

type DailyProgress = {
  date: string;
  scores: Record<string, number>;
};

export function loadDailyProgress(date: string): Record<string, number> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return {};

    const progress: DailyProgress = JSON.parse(saved);

    if (progress.date !== date) {
      return {};
    }

    return progress.scores;
  } catch {
    return {};
  }
}

export function saveDailyProgress(
  date: string,
  scores: Record<string, number>
) {
  const progress: DailyProgress = {
    date,
    scores,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
