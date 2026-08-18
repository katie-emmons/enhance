import { useState } from "react";
import PixelatedImage from "./PixelatedImage";
import { puzzles } from "../data/puzzles";
import HomeScreen from "./HomeScreen";
import PlayingScreen from "./PlayingScreen";

function Game() {
  // constants
  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [screen, setScreen] = useState("home");
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const puzzle = puzzles[currentPuzzle];

  const onNextPuzzle = () => {
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
};

  if (screen === "home") {
    return <HomeScreen onStart={() => setScreen("playing")} />;
  }

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
    <PlayingScreen
      puzzle={puzzle}
      level={level}
      setLevel={setLevel}
      guess={guess}
      setGuess={setGuess}
      message={message}
      setMessage={setMessage}
      onNextPuzzle={onNextPuzzle}
    />
  </div>
);}

export default Game;