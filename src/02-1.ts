import { readFileSync } from "fs";

const data = readFileSync("../data/02.txt", "utf-8");
const lines = data.trim().split("\n");

type gameValue = "Rock" | "Paper" | "Scissors";

const toGameValues = ([opponent, me]: [
  opponent: "A" | "B" | "C",
  me: "X" | "Y" | "Z"
]): { opponent: gameValue; me: gameValue } => {
  return {
    opponent: opponent == "A" ? "Rock" : opponent == "B" ? "Paper" : "Scissors",
    me: me == "X" ? "Rock" : me == "Y" ? "Paper" : "Scissors",
  };
};

const getWinner = (
  opponent: gameValue,
  me: gameValue
): "opponent" | "draw" | "me" => {
  if (opponent == me) return "draw";
  if (opponent == "Paper" && me == "Rock") return "opponent";
  if (opponent == "Paper" && me == "Scissors") return "me";
  if (opponent == "Rock" && me == "Paper") return "me";
  if (opponent == "Rock" && me == "Scissors") return "opponent";
  if (opponent == "Scissors" && me == "Paper") return "opponent";
  if (opponent == "Scissors" && me == "Rock") return "me";
};

const getScore = (opponent: gameValue, me: gameValue) => {
  const shapeScore = me == "Rock" ? 1 : me == "Paper" ? 2 : 3;
  const winner = getWinner(opponent, me);
  const resultScore = winner == "opponent" ? 0 : winner == "me" ? 6 : 3;
  return shapeScore + resultScore;
};

const games = lines.map((i) => {
  const { opponent, me } = toGameValues(
    i.split(" ") as ["A" | "B" | "C", "X" | "Y" | "Z"]
  );
  const score = getScore(opponent, me);
  return { opponent, me, score };
});
const scoreByStrategyGuide = games.reduce(
  (sum, nextItem) => sum + nextItem.score,
  0
);
console.log(
  `Total score if following the strategy guide for ${games.length} games: ${scoreByStrategyGuide}`
);
