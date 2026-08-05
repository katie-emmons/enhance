import Game from "./components/Game";

function App() {
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
      <h1>ENHANCE</h1>

      <Game />
    </div>
  );
}

export default App;
