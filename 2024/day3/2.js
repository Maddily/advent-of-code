const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, 'data.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let enabled = true;

  const mulRegexp = /mul\(\d{1,3},\d{1,3}\)/g;
  const doRegexp = /do\(\)/g;
  const doNotRegexp = /don\'t\(\)/g;
  const combinedRegexp = new RegExp(
    `${mulRegexp.source}|${doRegexp.source}|${doNotRegexp.source}`,
    'g'
  );
  const matches = data.matchAll(combinedRegexp);

  const result = matches.reduce((acc, match) => {
    if (doRegexp.test(match[0])) {
      enabled = true;
    } else if (doNotRegexp.test(match[0])) {
      enabled = false;
    } else if (enabled) {
      const numRegexp = /\d{1,3}/g;
      const [n1, n2] = match[0].match(numRegexp);
      const product = n1 * n2;

      return acc + product;
    }

    return acc;
  }, 0);

  console.log('Result:', result);
});
