type HomeScreenProps = {
  onStart: () => void;
};

function HomeScreen({ onStart }: HomeScreenProps) {
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

      <button onClick={onStart}>
        Start
      </button>
    </div>
  );
}

export default HomeScreen;