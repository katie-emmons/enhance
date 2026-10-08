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
  const [scores, setScores] = useState<Record<string, number>>({});
  const totalScore = Object.values(scores).reduce((total, score) => total + score, 0);
  const correctAnswers = Object.keys(scores).length;
  const onViewResults = () => {
    setScreen("results");}
  const categories = [...new Set(puzzles.map((puzzle) => puzzle.category))];
  const maxScore = categories.length * 1000;
  const onNextPuzzle = () => {
    setLevel(1);
    setGuess("");
    setMessage("");
    setScore(1000);
    setScreen("home");};
  const onCorrectAnswer = () => {
    setScores({
    ...scores,
    [puzzle.category]: score,
  });
};
const onSelectCategory = (category: string) => {
  const matchingIndexes = puzzles
    .map((puzzle, index) => (
      puzzle.category === category ? index : -1
    ))
    .filter((index) => index !== -1);

  if (matchingIndexes.length === 0) return;

  const randomIndex = Math.floor(
    Math.random() * matchingIndexes.length
  );

  setCurrentPuzzle(matchingIndexes[randomIndex]);
  setLevel(1);
  setGuess("");
  setMessage("");
  setScore(1000);
  setScreen("playing");
};
const allCategoriesComplete = categories.every(
  (category) => scores[category] !== undefined
);

  // transition b/t home screen and playing screen
  if (screen === "home") {
  return (
    <HomeScreen
      categories={categories}
      scores={scores}
      allCategoriesComplete={allCategoriesComplete}
      onSelectCategory={onSelectCategory}
      onViewResults={onViewResults}
    />
  );
}

  if (screen === "results") {
  return (
    <ResultsScreen
      scores={scores}
      totalScore={totalScore}
      maxScore={maxScore}
      correctAnswers={correctAnswers}
      totalCategories={categories.length}
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