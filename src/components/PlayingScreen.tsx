import PixelatedImage from "./PixelatedImage";
import type { Puzzle } from "../data/puzzles";

type PlayingScreenProps = {
  puzzle: Puzzle;
  level: number;
  setLevel: (level: number) => void;
  guess: string;
  setGuess: (guess: string) => void;
  message: string;
  setMessage: (message: string) => void;
  onNextPuzzle: () => void;
  score: number;
  setScore: (score: number) => void;
  onCorrectAnswer: () => void;
  allCategoriesComplete: boolean;
  puzzleStatus: "playing" | "solved" | "gaveUp";
  setPuzzleStatus: (status: "playing" | "solved" | "gaveUp") => void;
  onGiveUp: () => void;
};

function PlayingScreen({
  puzzle,
  level,
  setLevel,
  guess,
  setGuess,
  message,
  setMessage,
  onNextPuzzle,
  score,
  setScore,
  onCorrectAnswer,
  allCategoriesComplete,
  puzzleStatus,
  setPuzzleStatus,
  onGiveUp,
}: PlayingScreenProps) {

  return (
  <>
    <PixelatedImage
      image={puzzle.image}
      level={level}
    />

    <p>Enhancement Level: {level}</p>
    <p>Score: {score}</p>

    <input
      type="text"
      placeholder="Who or what is this?"
      value={guess}
      onChange={(e) => setGuess(e.target.value)}
      style={{
        padding: "10px",
        width: "250px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
      }}
    />

    <div
  style={{
    display: "flex",
    gap: "10px",
  }}
>
  <button
  disabled={puzzleStatus !== "playing"}
  onClick={() => {
    const normalizedGuess = guess.trim().toLowerCase();

    if (normalizedGuess === puzzle.answer) {
      setMessage("🎉 Correct!");
      setPuzzleStatus("solved");
      onCorrectAnswer();
    } else {
      setMessage("❌ Try again!");
    }
  }}
>
  Guess
</button>
  {level < 5 && (
  <button
  disabled={message.startsWith("🎉")}
    onClick={() => {
      if (level < 5) {
        setLevel(level + 1);
        setScore(score - 200);
      }
    }}
  >
    Enhance
  </button>
  )}
  {level === 5 && puzzleStatus === "playing" && (
  <button onClick={onGiveUp}>
    Give Up
  </button>
)}
</div>

    <p>{message}</p>

    {puzzleStatus !== "playing" && (
  <button onClick={onNextPuzzle}>
    {allCategoriesComplete ? "View Results" : "Back to Categories"}
  </button>
)}

  </>
);
}
export default PlayingScreen;