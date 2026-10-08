
export function getDailyPuzzle(
  puzzles: Puzzle[],
  category: string,
  date: string
): Puzzle | undefined {
  // Find all puzzles in this category
  const categoryPuzzles = puzzles.filter(
    (puzzle) => puzzle.category === category
  );

  if (categoryPuzzles.length === 0) {
    return undefined;
  }

  // Convert the date and category into a consistent number
  const key = `${date}-${category}`;

  let hash = 0;

  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }

  // Choose an index based on that number
  const index = (hash >>> 0) % categoryPuzzles.length;

  return categoryPuzzles[index];
}
