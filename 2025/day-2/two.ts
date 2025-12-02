declare const Deno: any;

const raw = await Deno.readTextFile(".aoc_session");
const session = raw.trim().replace(/^SESSION=/, "");

if (!session) {
  console.error("Your .aoc_session is empty or malformed.");
  Deno.exit(1);
}

const input = await fetch("https://adventofcode.com/2025/day/2/input", {
  headers: {
    Cookie: `session=${session}`,
    "User-Agent": "github.com/Maddily (AoC, Deno)",
  },
});
const ranges = await input.text();
const invalidIDs: number[] = [];

for (const range of ranges.trim().split(",")) {
  const [firstID, lastID] = range.split("-");

  for (let i = +firstID; i <= +lastID; i++) {
    const idString = i.toString();
    const maxSequenceLength = Math.floor(idString.length / 2);

    // Split each id into equal sequences, starting from 1 and up to maxSequenceLength
    for (let j = 1; j <= maxSequenceLength; j++) {
      const idDigits: string[] = [];

      for (let k = 0; k < idString.length; k += j) {
        idDigits.push(idString.slice(k, k + j));
      }

      // The id is invalid if the sequences are repetitions
      const allAreEqual = idDigits.every((comb) => comb === idDigits[0]);
      if (allAreEqual && !invalidIDs.includes(i)) invalidIDs.push(i);
    }
  }
}

const sumOfInvalidIDs = invalidIDs.reduce((total, id) => total + id, 0);
console.log(sumOfInvalidIDs);

export {};
