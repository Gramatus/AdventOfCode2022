import { readFileSync } from "fs";

const data = readFileSync("../data/01-1.txt", "utf-8");
const matcher = data.matchAll(/(.*?)(\n\n)/gs);
const matches: { data: string; nums: number[]; sum: number }[] = [];
for (const match of matcher) {
  const nums = match[0]
    .trim()
    .split("\n")
    .map((i) => parseInt(i));
  matches.push({
    data: match[0].trim(),
    nums,
    sum: nums.reduce((a, b) => a + b, 0),
  });
}
const sums = matches.map((i) => i.sum);
const largest = sums.sort().pop();
console.log(
  `The Elf carrying the most Calories carries: ${largest} Calories (!)`
);
