const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, 'data.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const regexp = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = data.match(regexp);

  const result = matches.reduce((acc, match) => {
    const regexp = /\d{1,3}/g;
    const [ n1, n2 ] = match.match(regexp);
    const product = n1 * n2;

    return acc + product;
  }, 0);

  console.log('Result:', result);
});
