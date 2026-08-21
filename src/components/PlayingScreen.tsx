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
  onViewResults: () => void;
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
  onViewResults,
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
  disabled={message.startsWith("🎉")}
  onClick={() => {
    const normalizedGuess = guess.trim().toLowerCase();

    if (normalizedGuess === puzzle.answer) {
      setMessage("🎉 Correct!");
      onCorrectAnswer();
    } else {
      setMessage("❌ Try again!");
    }
  }}
>
  Guess
</button>

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
</div>

    <p>{message}</p>

    {message.startsWith("🎉") && (
  <button onClick={onNextPuzzle}>
    Back to categories
  </button>
)}

<button onClick={onViewResults}>
  View Results
</button>

  </>
);
}
export default PlayingScreen;