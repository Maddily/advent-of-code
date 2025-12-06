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
const operands: number[] = [];
let operator;
let grandTotal = 0;

for (let i = input[0].length - 1; i >= 0; i--) {
  const operand = input
    .slice(0, input.length - 1)
    .reduce((num: string[], list) => {
      if (list[i] !== " ") return num.concat(list[i]);
      return num;
    }, [])
    .join("");
  if (operand) operands.push(+operand);

  if (input[input.length - 1][i] !== " ") {
    operator = input[input.length - 1][i];
  }

  if (operator) {
    grandTotal +=
      operator === "+"
        ? operands.reduce((total, num) => total + num, 0)
        : operands.reduce((total, num) => total * num, 1);
    operator = undefined;
    operands.splice(0, operands.length);
  }
}

console.log(grandTotal);

export {};
