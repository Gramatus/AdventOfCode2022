import { readFileSync } from "fs";

const data = readFileSync("../data/02.txt", "utf-8");
const lines = data.trim().split("\n");

type gameValue = "Rock" | "Paper" | "Scissors";
type resultType = "opponent" | "draw" | "me";

const toGameValues = ([opponent, targetResult]: [
  opponent: "A" | "B" | "C",
  targetResult: "X" | "Y" | "Z"
]): { opponent: gameValue; targetResult: resultType } => {
  return {
    opponent: opponent == "A" ? "Rock" : opponent == "B" ? "Paper" : "Scissors",
    targetResult:
      targetResult == "X" ? "opponent" : targetResult == "Y" ? "draw" : "me",
  };
};

const getMyGame = (
  opponent: gameValue,
  targetResult: resultType
): gameValue => {
  if (targetResult == "draw") return opponent;
  if (opponent == "Paper" && targetResult == "opponent") return "Rock";
  if (opponent == "Paper" && targetResult == "me") return "Scissors";
  if (opponent == "Rock" && targetResult == "opponent") return "Scissors";
  if (opponent == "Rock" && targetResult == "me") return "Paper";
  if (opponent == "Scissors" && targetResult == "opponent") return "Paper";
  if (opponent == "Scissors" && targetResult == "me") return "Rock";
};

const getScore = (opponent: gameValue, me: gameValue, winner: resultType) => {
  const shapeScore = me == "Rock" ? 1 : me == "Paper" ? 2 : 3;
  const resultScore = winner == "opponent" ? 0 : winner == "me" ? 6 : 3;
  return shapeScore + resultScore;
};

const games = lines.map((i) => {
  const { opponent, targetResult } = toGameValues(
    i.split(" ") as ["A" | "B" | "C", "X" | "Y" | "Z"]
  );
  const me = getMyGame(opponent, targetResult);
  const score = getScore(opponent, me, targetResult);
  return { opponent, me, targetResult, score };
});
const scoreByStrategyGuide = games.reduce(
  (sum, nextItem) => sum + nextItem.score,
  0
);
console.log(
  `Total score if *correctly* following the strategy guide for ${games.length} games: ${scoreByStrategyGuide}`
);
