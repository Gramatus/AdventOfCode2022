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
const largest_1 = sums.sort().pop();
const largest_2 = sums.sort().pop();
const largest_3 = sums.sort().pop();
console.log(
  `The three Elves carrying the most Calories carries a whopping total of: ${
    largest_1 + largest_2 + largest_3
  } Calories (!)`
);
