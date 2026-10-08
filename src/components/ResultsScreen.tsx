type ResultsScreenProps = {
  scores: Record<string, number>;
  totalScore: number;
  maxScore: number;
  totalCategories: number,
  correctAnswers: number,
};

function ResultsScreen({
  scores,
  totalScore,
  maxScore,
  totalCategories,
  correctAnswers,
}: ResultsScreenProps) {
  return (
  <div
    style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "24px",
      boxSizing: "border-box",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <div
  style={{
    width: "100%",
    maxWidth: "380px",
    padding: "28px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e5e5",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  }}
><div style={{ textAlign: "center" }}>
  <h1 style={{ margin: "0 0 20px" }}>ENHANCE</h1>
  <p style={{ margin: 0, color: "#666" }}>
    Daily Challenge Complete!
  </p>
</div>

      <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
    maxWidth: "320px",
  }}
>
  {Object.entries(scores).map(([category, score]) => (
    <div
      key={category}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <span
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "24px",
      height: "24px",
      backgroundColor: "#218B57",
      color: "white",
      borderRadius: "5px",
      fontSize: "16px",
      fontWeight: "bold",
    }}
  >
    ✓
  </span>

  <span>{category}</span>
</div>
      <span>{score.toLocaleString()}</span>
    </div>
  ))}
</div>

      <hr />

      <div
  style={{
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "24px",
    marginTop: "24px",
    width: "100%",
    maxWidth: "320px",
  }}
>
  <div style={{ textAlign: "center" }}>
    <p>Correct</p>
    <h2>{correctAnswers} / {totalCategories}</h2>
  </div>

  <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    textAlign: "center",
  }}
>
  <p style={{ margin: 0 }}>Total Score</p>

  <h2 style={{ margin: 0 }}>
    {totalScore.toLocaleString()}
  </h2>

  <p style={{ margin: 0, color: "#666" }}>
    out of {maxScore.toLocaleString()}
  </p>
</div>
</div>
    </div>
    </div>
  );
}

export default ResultsScreen;