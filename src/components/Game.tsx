import { useState } from "react";
import PixelatedImage from "./PixelatedImage";
import { puzzles } from "../data/puzzles";

function Game() {
  // set initial level to 1 (hardest)
  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const [currentPuzzle, setCurrentPuzzle] = useState(0);

  const puzzle = puzzles[currentPuzzle];


  return (
    <>
      <PixelatedImage
        image={puzzle.image}
        level={level}
      />

      <p>Enhancement Level: {level}</p>

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
    onClick={() => {
      const normalizedGuess = guess.trim().toLowerCase();

      if (normalizedGuess === puzzle.answer) {
        setMessage("🎉 Correct!");
        {message.startsWith("🎉") && (
  <button
    onClick={() => {
      if (puzzles.length > 1) {
        let randomIndex = Math.floor(Math.random() * puzzles.length);
        while (randomIndex === currentPuzzle) {
          randomIndex = Math.floor(Math.random() * puzzles.length);
        }
        setCurrentPuzzle(randomIndex);
      }
      setLevel(1);
      setGuess("");
      setMessage("");
    }}
  >
    Next Puzzle
  </button>
)}
      } else {
        setMessage("❌ Try again!");
      }
    }}
  >
    Guess
  </button>

  <button
    onClick={() => {
      if (level < 5) {
        setLevel(level + 1);
      }
    }}
  >
    Enhance
  </button>
</div>
      
      <p>{message}</p>
    </>
  );
}

export default Game;
