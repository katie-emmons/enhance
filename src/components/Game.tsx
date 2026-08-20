import { useState } from "react";
import PixelatedImage from "./PixelatedImage";
import { puzzles } from "../data/puzzles";
import HomeScreen from "./HomeScreen";
import PlayingScreen from "./PlayingScreen";
import ResultsScreen from "./ResultsScreen";

function Game() {
  // constants
  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [screen, setScreen] = useState("home");
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const puzzle = puzzles[currentPuzzle];
  const [score, setScore] = useState(1000);
  const POINTS_PER_ENHANCEMENT = 200;
  const [scores, setScores] = useState<Record<string, number>>({});
  const totalScore = Object.values(scores).reduce((total, score) => total + score, 0);
  const onViewResults = () => {setScreen("results");

  };

  // next puzzle
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
    setScore(1000);
  };

  const onCorrectAnswer = () => {
  setScores({
    ...scores,
    [puzzle.category]: score,
  });
};

  // transition b/t home screen and playing screen
  if (screen === "home") {
    return <HomeScreen onStart={() => setScreen("playing")} />;
  }

  if (screen === "results") {
  return (
    <ResultsScreen
      scores={scores}
      totalScore={totalScore}
    />
  );
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
      score={score}
      setScore={setScore}
      onCorrectAnswer={onCorrectAnswer}
      onViewResults={onViewResults}

    />
  </div>
);}

export default Game;