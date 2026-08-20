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
    category: "Landmarks",
    image: "/images/statue_of_liberty.jpg",
    answer: "statue of liberty",
  },
];