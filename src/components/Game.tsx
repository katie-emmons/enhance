import { useState } from "react";
import PixelatedImage from "./PixelatedImage";
import { puzzles } from "../data/puzzles";

function Game() {
  // constants
  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [screen, setScreen] = useState("home");
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const puzzle = puzzles[currentPuzzle];

  if (screen === "home"){
    // return home screen
    return (
      <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        gap: "20px",
      }}
    >
      <h2>Identify the image</h2>

      <button onClick={() => setScreen("playing")}>
        Start
      </button>
      </div>

    )
  }


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

      {message.startsWith("🎉") && (
        <button>
          Next Puzzle
        </button>
      )}
    </>
  );
}

export default Game;
