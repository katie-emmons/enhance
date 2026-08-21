import PixelatedImage from "./PixelatedImage";

type HomeScreenProps = {
  categories: string[];
  scores: Record<string, number>;
  onSelectCategory: (category: string) => void;
  allCategoriesComplete: boolean;
  onViewResults: () => void;
};

function HomeScreen({
  categories,
  scores,
  allCategoriesComplete,
  onSelectCategory,
  onViewResults,
}: HomeScreenProps) {
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

      <PixelatedImage
        image="/images/elephant.jpg"
        level={1}
      />

      <h2>Identify the image</h2>

      <h3>Today's Challenge</h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {categories.map((category) => {
          const completed = scores[category] !== undefined;

          return (
            <button
              key={category}
              disabled={completed}
              onClick={() => onSelectCategory(category)}
            >
              {completed
                ? `✓ ${category} — ${scores[category]}`
                : category}
            </button>
          );
        })}
      </div>
      {allCategoriesComplete && (
  <button onClick={onViewResults}>
    View Results
  </button>
)}
    </div>
  );
}

export default HomeScreen;