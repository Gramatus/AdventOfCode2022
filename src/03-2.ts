import { readFileSync } from "fs";

const data = readFileSync("../data/03.txt", "utf-8");
const lines = data.trim().split("\n");

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type Range<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T;
const firstUpperCaseCode = 65;
const lastUpperCaseCode = 90;
const firstLowerCaseCode = 97;
const lastLowerCaseCode = 122;

type charCode =
  | Range<typeof firstUpperCaseCode, typeof lastUpperCaseCode>
  | Range<typeof firstLowerCaseCode, typeof lastLowerCaseCode>;

interface ruckSack {
  compartmentA: charCode[];
  compartmentB: charCode[];
  allItems: charCode[];
  commonValue?: charCode;
  priority?: number;
}
function intersectThree<T>(a: T[], b: T[], c: T[]) {
  const setB = new Set(b);
  const setC = new Set(c);
  return [...new Set(a)].filter((x) => setB.has(x) && setC.has(x));
}
const getPriority = (code: charCode) => {
  if (code < 95) return code - firstUpperCaseCode + 26 + 1;
  else return code - firstLowerCaseCode + 1;
};

let group: [ruckSack?, ruckSack?, ruckSack?] = [];
const groups: {
  group: typeof group;
  priority?: number;
  commonValue?: charCode;
}[] = [];

lines.map((line): ruckSack => {
  const characters = line.split("").map((i) => i.charCodeAt(0)) as charCode[];
  const compartmentB = characters.slice(-(characters.length / 2));
  const compartmentA = characters.slice(0, characters.length / 2);

  const ruckSack: ruckSack = {
    compartmentA,
    compartmentB,
    allItems: compartmentA.concat(compartmentB),
  };
  group.push(ruckSack);
  if (group.length == 3) {
    const commonValues = intersectThree(
      group[0].allItems,
      group[1].allItems,
      group[2].allItems
    );
    if (commonValues.length !== 1) {
      console.log(
        "Multiple or no common values: ",
        commonValues,
        group[0].allItems,
        group[1].allItems,
        group[2].allItems
      );
      throw "Code fails!";
    }
    const commonValue = commonValues[0];
    const priority = getPriority(commonValue);
    group.map((i) => {
      i.commonValue = commonValue;
      i.priority = priority;
    });
    groups.push({ group, priority, commonValue });
    group = [];
  }

  return ruckSack;
});
if (group.length > 0) {
  throw "Incomplete group for last " + group.length + " items!";
}
const sumOfPriorities = groups.reduce(
  (sum, nextItem) => sum + nextItem.priority,
  0
);

console.log(
  `The sum of the priority of the badges for all groups are: ${sumOfPriorities}`
);
