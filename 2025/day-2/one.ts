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
    const idLength = i.toString().length;

    if (idLength % 2 === 0) {
      const firstHalfOfID = i.toString().slice(0, idLength / 2);
      const secondHalfOfID = i.toString().slice(idLength / 2);
      if (firstHalfOfID === secondHalfOfID) invalidIDs.push(i);
    }
  }
}

const sumOfInvalidIDs = invalidIDs.reduce((total, id) => total + id, 0);
console.log(sumOfInvalidIDs);

export {};
