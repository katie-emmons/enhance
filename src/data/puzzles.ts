export type Puzzle = {
  id: number;
  category: string;
  image: string;
  answer: string;
};

export const puzzles: Puzzle[] = [
  {
    id: 1,
    category: "Animals",
    image: "/images/elephant.jpg",
    answer: "elephant",
  },
  {
    id: 2,
    category: "Animals",
    image: "/images/flamingos.jpg",
    answer: "flamingo",
  },
  {
    id: 3,
    category: "Animals",
    image: "/images/giraffe.jpeg",
    answer: "giraffe",
  },
  {
    id: 4,
    category: "Animals",
    image: "/images/orca.jpg",
    answer: "orca",
  },
  {
    id: 5,
    category: "Animals",
    image: "/images/panda.jpg",
    answer: "panda",
  },
  {
    id: 6,
    category: "Landmarks",
    image: "/images/golden_gate_bridge.jpg",
    answer: "golden gate bridge",
  },
  {
    id: 7,
    category: "Landmarks",
    image: "/images/Machu_Picchu.jpeg",
    answer: "machu picchu",
  },
  {
    id: 8,
    category: "Landmarks",
    image: "/images/statue_of_liberty.jpg",
    answer: "statue of liberty",
  },
  {
    id: 9,
    category: "Landmarks",
    image: "/images/taj_mahal.jpg",
    answer: "taj mahal",
  },
  {
    id: 10,
    category: "Landmarks",
    image: "/images/tour_eiffel.jpg",
    answer: "eiffel tower",
  },
];