declare const Deno: any;

const raw = await Deno.readTextFile(".aoc_session");
const session = raw.trim().replace(/^SESSION=/, "");

if (!session) {
  console.error("Your .aoc_session is empty or malformed.");
  Deno.exit(1);
}

const input = await fetch("https://adventofcode.com/2025/day/3/input", {
  headers: {
    Cookie: `session=${session}`,
    "User-Agent": "github.com/Maddily (AoC, Deno)",
  },
});
const banks = await input.text();
let totalJoltage = 0;

for (const bank of banks.trim().split("\n")) {
  const maxJoltage = findMaxJoltage(bank);
  totalJoltage += maxJoltage;
}

function findMaxJoltage(bank: string) {
  const digits: string[] = [];

  for (let i = 0; i < bank.length; i++) {
    const battery = bank[i];
    /* pop digits from the digits stack if the top digit is less
    than the current one in the bank, only if the stack digits
    and the remaining digits in the bank are at least 12 */
    while (
      digits.length &&
      +digits[digits.length - 1] < +battery &&
      digits.length + bank.length - i > 12
    ) {
      digits.pop();
    }
    digits.push(battery);
  }

  // The maximum joltage must consist of 12 digits. The two highest ones are from the left.
  const maxJoltage = digits
    .slice(0, 12)
    .reduce((acc, digit) => acc + digit, "");
  return +maxJoltage;
}

console.log(totalJoltage);

export {};
