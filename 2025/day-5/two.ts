declare const Deno: any;

const raw = await Deno.readTextFile(".aoc_session");
const session = raw.trim().replace(/^SESSION=/, "");

if (!session) {
  console.error("Your .aoc_session is empty or malformed.");
  Deno.exit(1);
}

const response = await fetch("https://adventofcode.com/2025/day/5/input", {
  headers: {
    Cookie: `session=${session}`,
    "User-Agent": "github.com/Maddily (AoC, Deno)",
  },
});
const input = (await response.text()).trim().split("\n\n");
const freshIngredientIdRanges = input[0]
  .split("\n")
  .map((range) => range.split("-").map((num) => parseInt(num, 10)));

function countUniqueIds(ranges: number[][]) {
  if (ranges.length === 0) return 0;

  // Sort the ranges so that we go left to right,
  // and merge overlapping or adjacent ranges.
  ranges.sort((a, b) => a[0] - b[0]);

  let [currentStart, currentEnd] = ranges[0];
  let totalCount = 0;

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];

    // If this is a disjoint range, add its length to totalCount,
    // and make it our new current range that is to be merged with
    // the next adjacent/overlapping range.
    if (start > currentEnd + 1) {
      totalCount += currentEnd - currentStart + 1;

      [currentStart, currentEnd] = [start, end];
    } else {
      // if this is an adjacent/overlapping range,
      // and the last number in the range is greater
      // than the last number in the current range,
      // update the last number in the current range
      // to merge this range with the current one.
      if (end > currentEnd) {
        currentEnd = end;
      }
    }
  }

  totalCount += currentEnd - currentStart + 1;

  return totalCount;
}

const freshIngredientIdsCount = countUniqueIds(freshIngredientIdRanges);

console.log(freshIngredientIdsCount);

export {};
