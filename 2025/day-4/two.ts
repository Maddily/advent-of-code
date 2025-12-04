declare const Deno: any;

const raw = await Deno.readTextFile(".aoc_session");
const session = raw.trim().replace(/^SESSION=/, "");

if (!session) {
  console.error("Your .aoc_session is empty or malformed.");
  Deno.exit(1);
}

const input = await fetch("https://adventofcode.com/2025/day/4/input", {
  headers: {
    Cookie: `session=${session}`,
    "User-Agent": "github.com/Maddily (AoC, Deno)",
  },
});
const grid = await input.text();
const lines = grid.trim().split("\n");
let rollsRemovedThisIteration = 0;
let totalRemovedRolls = 0;
let thereAreAccessibleRolls = true;

while (thereAreAccessibleRolls) {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      const cell = line[j];
      const adjacentRolls: string[] = [];

      // If this is an accessible roll of paper, remove it
      if (cell === "@" && isRollAccessible(adjacentRolls, i, j, line)) {
        const updatedLine = lines[i].split("");
        updatedLine[j] = ".";
        lines[i] = updatedLine.join("");
        totalRemovedRolls++;
        rollsRemovedThisIteration++;
      }
    }
  }
  if (rollsRemovedThisIteration === 0) {
    thereAreAccessibleRolls = false;
  } else {
    rollsRemovedThisIteration = 0;
  }
}

console.log(totalRemovedRolls);

function isRollAccessible(
  adjacentRolls: string[],
  i: number,
  j: number,
  line: string
) {
  // Rolls of paper from the line above
  if (i > 0) {
    if (j > 0) adjacentRolls.push(lines[i - 1][j - 1]);
    adjacentRolls.push(lines[i - 1][j]);
    if (j + 1 < line.length) adjacentRolls.push(lines[i - 1][j + 1]);
  }

  // Rolls of paper from the current line
  if (j > 0) adjacentRolls.push(line[j - 1]);
  if (j + 1 < line.length) adjacentRolls.push(line[j + 1]);

  // Rolls of paper from the line below
  if (i + 1 < lines.length) {
    if (j > 0) adjacentRolls.push(lines[i + 1][j - 1]);
    adjacentRolls.push(lines[i + 1][j]);
    if (j + 1 < line.length) adjacentRolls.push(lines[i + 1][j + 1]);
  }

  const numberOfAdjacentRolls = adjacentRolls.reduce((total, cell) => {
    if (cell === "@") {
      return total + 1;
    }
    return total;
  }, 0);

  if (numberOfAdjacentRolls < 4) return true;
}

export {};
