declare const Deno: any;

const raw = await Deno.readTextFile(".aoc_session");
const session = raw.trim().replace(/^SESSION=/, "");

if (!session) {
  console.error("Your .aoc_session is empty or malformed.");
  Deno.exit(1);
}

const input = await fetch("https://adventofcode.com/2025/day/1/input", {
  headers: {
    Cookie: `session=${session}`,
    "User-Agent": "github.com/Maddily (AoC, Deno)",
  },
});
const rotations = await input.text();

let dial = 50;
// The number of times the dial landed at 0 after a rotation
let zeroCount = 0;

for (const rotation of rotations.trim().split("\n")) {
  const [direction, ...num] = rotation;
  const clicks = +num.join("");

  if (direction === "L") {
    dial = (dial - clicks + 100) % 100;
  } else {
    dial = (dial + clicks) % 100;
  }

  if (dial === 0) zeroCount++;
}

console.log(zeroCount);

export {};
