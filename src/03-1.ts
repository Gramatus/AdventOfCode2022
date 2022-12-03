import { readFileSync } from "fs";

const data = readFileSync("../data/03.txt", "utf-8");
const lines = data.trim().split("\n");

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;
const firstUpperCaseCode = 65;
const lastUpperCaseCodePlusOne = 91;
const firstLowerCaseCode = 97;
const lastLowerCaseCodePlusOne = 123;

type charCode =
  | Range<typeof firstUpperCaseCode, typeof lastUpperCaseCodePlusOne>
  | Range<typeof firstLowerCaseCode, typeof lastLowerCaseCodePlusOne>;

interface ruckSack {
  compartmentA: charCode[];
  compartmentB: charCode[];
  commonValue: charCode;
  priority: number;
}
function intersect<T>(a: T[], b: T[]) {
  const setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}
const getPriority = (code: charCode) => {
  if (code < 95) return code - firstUpperCaseCode + 26 + 1;
  else return code - firstLowerCaseCode + 1;
};

const ruckSacks = lines.map((line): ruckSack => {
  const characters = line.split("").map((i) => i.charCodeAt(0)) as charCode[];
  const compartmentB = characters.slice(-(characters.length / 2));
  const compartmentA = characters.slice(0, characters.length / 2);
  const commonValue = intersect(compartmentA, compartmentB);
  if (commonValue.length !== 1) {
    console.log(
      "Multiple or no common values: ",
      commonValue,
      compartmentA,
      compartmentB,
      characters
    );
    throw "Code fails!";
  }

  return {
    compartmentA,
    compartmentB,
    commonValue: commonValue[0],
    priority: getPriority(commonValue[0]),
  };
});
const sumOfPriorities = ruckSacks.reduce(
  (sum, nextItem) => sum + nextItem.priority,
  0
);

console.log(
  `The sum of the priority of the misplaced items in all rucksaks are: ${sumOfPriorities}`
);
