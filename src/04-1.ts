import { readFileSync } from "fs";

const data = readFileSync("../data/04.txt", "utf-8");
const lines = data.trim().split("\n");

interface range {
  start: number;
  end: number;
}

interface pair {
  a: range;
  b: range;
  hasOverlap?: overlapType;
}

type overlapType = "aIsInB" | "bIsInA" | "thereAreSomeUniqueValues";

const hasOverlap = ({ a, b }: pair): overlapType => {
  if (a.start <= b.start && a.end >= b.end) return "bIsInA";
  else if (b.start <= a.start && b.end >= a.end) return "aIsInB";
  else return "thereAreSomeUniqueValues";
};

const pairs = lines.map((line): pair => {
  const [a, b] = line
    .split(",")
    .map((i) => i.split("-").map((n) => parseInt(n)));
  const p: pair = {
    a: { start: a[0], end: a[1] },
    b: { start: b[0], end: b[1] },
  };
  return { ...p, hasOverlap: hasOverlap(p) };
});
const overlappingPairs = pairs.filter(
  (p) => p.hasOverlap != "thereAreSomeUniqueValues"
);

console.log(
  `The number of assignment pairs where one range fully contains the other are: ${overlappingPairs.length}`
);
