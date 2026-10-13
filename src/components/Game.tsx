import { puzzles } from "../data/puzzles";
import HomeScreen from "./HomeScreen";
import PlayingScreen from "./PlayingScreen";
import ResultsScreen from "./ResultsScreen";
import { getDailyPuzzle } from "../utils/dailyPuzzle";
import { useState, useEffect } from "react";
import { loadDailyProgress, saveDailyProgress } from "../utils/dailyProgress";

function Game() {
  const today = new Date().toISOString().slice(0, 10);
  // State declarations
  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [screen, setScreen] = useState("home");
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const puzzle = puzzles[currentPuzzle];
  const [score, setScore] = useState(1000);
  const [scores, setScores] = useState<Record<string, number>>(() => loadDailyProgress(today));

  // Save progress whenever scores change
  useEffect(() => {
    saveDailyProgress(today, scores);
  }, [today, scores]);

  // Other constants
  const totalScore = Object.values(scores).reduce((total, score) => total + score, 0);
  const correctAnswers = Object.keys(scores).length;
  const onViewResults = () => {
    setScreen("results");}
  const categories = [...new Set(puzzles.map((puzzle) => puzzle.category))];
  const maxScore = categories.length * 1000;
  const allCategoriesComplete = categories.every(
  (category) => scores[category] !== undefined);
  
  const onNextPuzzle = () => {
    console.log("Categories:", categories);
    console.log("Scores:", scores);
    console.log("All categories complete:", allCategoriesComplete);
  
    setLevel(1);
    setGuess("");
    setMessage("");
    setScore(1000);

  if (allCategoriesComplete) {
    setScreen("results");
  } else {
    setScreen("home");
  }
};
    const onCorrectAnswer = () => {
  console.log("Correct answer for:", puzzle.category);
  console.log("Score earned:", score);

  setScores((previousScores) => ({
    ...previousScores,
    [puzzle.category]: score,
  }));
};
  const onSelectCategory = (category: string) => {
  const today = new Date().toISOString().slice(0, 10);
  const dailyPuzzle = getDailyPuzzle(puzzles, category, today);
  if (!dailyPuzzle) return;
  const puzzleIndex = puzzles.findIndex(
    (puzzle) => puzzle.id === dailyPuzzle.id
  );
  if (puzzleIndex === -1) return;
  setCurrentPuzzle(puzzleIndex);
  setLevel(1);
  setGuess("");
  setMessage("");
  setScore(1000);
  setScreen("playing");
};

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
      allCategoriesComplete={allCategoriesComplete}

    />
  </div>
);}

export default Game;