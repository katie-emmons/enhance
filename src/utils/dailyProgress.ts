const STORAGE_KEY = "enhance-daily-progress";

type Scores = Record<string, number>;
type ProgressHistory = Record<string, Scores>;

type LegacyProgress = {
  date: string;
  scores: Scores;
};

// Read saved history, including the old single-day format
function readHistory(): ProgressHistory {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};

    const data: unknown = JSON.parse(saved);

    if (
      typeof data !== "object" ||
      data === null ||
      Array.isArray(data)
    ) {
      return {};
    }

    // Convert the old format to the new one
    if ("date" in data && "scores" in data) {
      const old = data as LegacyProgress;

      if (
        typeof old.date === "string" &&
        old.scores &&
        typeof old.scores === "object" &&
        !Array.isArray(old.scores)
      ) {
        return { [old.date]: old.scores };
      }

      return {};
    }

    return data as ProgressHistory;
  } catch {
    return {};
  }
}

export function loadDailyProgress(date: string): Scores {
  const history = readHistory();
  return history[date] ?? {};
}

export function saveDailyProgress(
  date: string,
  scores: Scores
): void {
  const history = readHistory();

  history[date] = scores;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}
