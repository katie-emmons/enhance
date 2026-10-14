import PixelatedImage from "./PixelatedImage";

type NewChallengeScreenProps = {
  onStartNewChallenge: () => void;
};

function NewChallengeScreen({
  onStartNewChallenge,
}: NewChallengeScreenProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1>ENHANCE</h1>

      <PixelatedImage
        image="/images/elephant.jpg"
        level={1}
      />

      <h2>A New Daily Challenge is Ready!</h2>

      <button onClick={onStartNewChallenge}>
        Play Today's Challenge
      </button>
    </div>
  );
}

export default NewChallengeScreen;
