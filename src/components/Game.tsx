import { puzzles } from "../data/puzzles";
import HomeScreen from "./HomeScreen";
import PlayingScreen from "./PlayingScreen";
import ResultsScreen from "./ResultsScreen";
import { getDailyPuzzle } from "../utils/dailyPuzzle";
import { useState, useEffect } from "react";
import { loadDailyProgress, saveDailyProgress } from "../utils/dailyProgress";
import { getLocalDate } from "../utils/date";
import NewChallengeScreen from "./NewChallengeScreen";

function Game() {
  const [challengeDate, setChallengeDate] = useState(getLocalDate);
  const [currentDate, setCurrentDate] = useState(getLocalDate);
  // State declarations
  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [screen, setScreen] = useState("home");
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const puzzle = puzzles[currentPuzzle];
  const [score, setScore] = useState(1000);
  const [scores, setScores] = useState<Record<string, number>>(() => loadDailyProgress(challengeDate));
  const [puzzleStatus, setPuzzleStatus] = useState<
  "playing" | "solved" | "gaveUp"
>("playing");
  useEffect(() => {
  const checkDate = () => {
    setCurrentDate(getLocalDate());
  };

  const interval = window.setInterval(checkDate, 60_000);

  return () => window.clearInterval(interval);
}, []);

const newChallengeAvailable = currentDate !== challengeDate;

  // Other constants
  const totalScore = Object.values(scores).reduce((total, score) => total + score, 0);
  const correctAnswers = Object.values(scores).filter(
  (score) => score > 0
).length;
  const onViewResults = () => {
    setScreen("results");}
  const categories = [...new Set(puzzles.map((puzzle) => puzzle.category))];
  const maxScore = categories.length * 1000;
  const allCategoriesComplete = categories.every(
  (category) => scores[category] !== undefined);
  
  const onNextPuzzle = () => {
    setLevel(1);
    setGuess("");
    setMessage("");
    setScore(1000);
    setPuzzleStatus("playing");

  if (allCategoriesComplete) {
    setScreen("results");
  } else {
    setScreen("home");
  }
};
    
const recordPuzzleResult = (points: number) => {
  const updatedScores = {
    ...scores,
    [puzzle.category]: points,
  };

  setScores(updatedScores);
  saveDailyProgress(challengeDate, updatedScores);
};
const onCorrectAnswer = () => {
  recordPuzzleResult(score);
};

const onGiveUp = () => {
  recordPuzzleResult(0);
  setPuzzleStatus("gaveUp");
  setMessage(`The answer was: ${puzzle.answer}`);
};

  const onSelectCategory = (category: string) => {
  const dailyPuzzle = getDailyPuzzle(puzzles, category, challengeDate);
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
  setPuzzleStatus("playing");
};

const onStartNewChallenge = () => {
  const newDate = getLocalDate();

  setScores(loadDailyProgress(newDate));
  setLevel(1);
  setGuess("");
  setMessage("");
  setScore(1000);
  setCurrentPuzzle(0);
  setChallengeDate(newDate);
  setCurrentDate(newDate);
  setScreen("home");
  setPuzzleStatus("playing");
};

  // transition b/t home screen and playing screen
  if (newChallengeAvailable && screen === "home") {
  return (
    <NewChallengeScreen
      onStartNewChallenge={onStartNewChallenge}
    />
  );
}
  
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
      puzzleStatus={puzzleStatus}
      setPuzzleStatus={setPuzzleStatus}
      onGiveUp={onGiveUp}
    />
  </div>
);}

export default Game;