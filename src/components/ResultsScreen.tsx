type ResultsScreenProps = {
  scores: Record<string, number>;
  totalScore: number;
};

function ResultsScreen({
  scores,
  totalScore,
}: ResultsScreenProps) {
  return (
    <div>
      <h1>Daily Results</h1>

      {Object.entries(scores).map(([category, score]) => (
        <p key={category}>
          {category}: {score}
        </p>
      ))}

      <hr />

      <p>Total Score: {totalScore}</p>
    </div>
  );
}

export default ResultsScreen;