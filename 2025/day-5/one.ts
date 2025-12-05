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
const availableIngredientIds = input[1]
  .split("\n")
  .map((num) => parseInt(num, 10));
let freshIngredientIdsCount = 0;

for (const id of availableIngredientIds) {
  for (const [start, end] of freshIngredientIdRanges) {
    if (id >= start && id <= end) {
      freshIngredientIdsCount++;
      break;
    }
  }
}

console.log(freshIngredientIdsCount);

export {};
