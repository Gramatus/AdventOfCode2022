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
  hasCompleteOverlap?: completeOverlapType;
  hasOverlap?: overlapType;
}

type completeOverlapType = "aIsInB" | "bIsInA" | "thereAreSomeUniqueValues";
type overlapType = "overlap" | "separate";

const hasCompleteOverlap = ({ a, b }: pair): completeOverlapType => {
  if (a.start <= b.start && a.end >= b.end) return "bIsInA";
  else if (b.start <= a.start && b.end >= a.end) return "aIsInB";
  else return "thereAreSomeUniqueValues";
};
const hasOverlap = ({ a, b }: pair): overlapType => {
  if (a.end < b.start) return "separate";
  else if (a.start > b.end) return "separate";
  else return "overlap";
};

const pairs = lines.map((line): pair => {
  const [a, b] = line
    .split(",")
    .map((i) => i.split("-").map((n) => parseInt(n)));
  const p: pair = {
    a: { start: a[0], end: a[1] },
    b: { start: b[0], end: b[1] },
  };
  return {
    ...p,
    hasCompleteOverlap: hasCompleteOverlap(p),
    hasOverlap: hasOverlap(p),
  };
});
const overlappingPairs = pairs.filter((p) => p.hasOverlap == "overlap");
// const otherPairs = pairs.filter((p) => p.hasOverlap == "separate");
// console.log(overlappingPairs.slice(1, 5));
// console.log(otherPairs.slice(1, 5));

console.log(
  `The number of assignment pairs where there are some overlap of the ranges are: ${overlappingPairs.length}`
);
