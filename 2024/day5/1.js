const fs = require('fs');
const path = require('path');

function isInOrder(update, rules) {
  for (let i = 0; i < update.length - 1; i++) {
    for (let j = i + 1; j < update.length; j++) {
      for (const rule of rules) {
        if (rule[1] === update[i] && rule[0] === update[j]) {
          return false;
        }
      }
    }
  }

  return true;
}

try {
  const orderingRules = fs.readFileSync(
    path.resolve(__dirname, 'ordering-rules.txt'),
    'utf8'
  ).trim().split('\n').map((rule) => rule.split('|').map((n) => +n));
  const updates = fs.readFileSync(
    path.resolve(__dirname, 'updates.txt'),
    'utf8'
  ).trim().split('\n').map((update) => update.split(',').map((n) => +n));

  let result = 0;

  for (const update of updates) {
    if (isInOrder(update, orderingRules)) {
      const middleNumber = update[Math.floor((update.length - 1) / 2)];
      result += middleNumber;
    }
  }

  console.log(result);
} catch (err) {
  console.error(err);
}
