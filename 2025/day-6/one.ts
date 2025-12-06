declare const Deno: any;

const raw = await Deno.readTextFile(".aoc_session");
const session = raw.trim().replace(/^SESSION=/, "");

if (!session) {
  console.error("Your .aoc_session is empty or malformed.");
  Deno.exit(1);
}

const response = await fetch("https://adventofcode.com/2025/day/6/input", {
  headers: {
    Cookie: `session=${session}`,
    "User-Agent": "github.com/Maddily (AoC, Deno)",
  },
});
const input = (await response.text()).trim().split("\n");
let grandTotal = 0;

const operators = input[input.length - 1]
  .trim()
  .split("")
  .filter((char) => ["+", "*"].includes(char));

for (let i = 0; i < operators.length; i++) {
  const operator = operators[i];
  const operands = input
    .slice(0, input.length - 1)
    .reduce((nums: number[], list: string) => {
      const operand = list
        .split(" ")
        .filter((char) => char !== " " && char !== "")[i];
      return nums.concat(+operand);
    }, []);

  grandTotal +=
    operator === "+"
      ? operands.reduce((total, num) => total + num, 0)
      : operands.reduce((total, num) => total * num, 1);
}

console.log(grandTotal);

export {};
