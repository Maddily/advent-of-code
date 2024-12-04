const fs = require('fs');
const path = require('path');

function checkDirection(matrix, i, j, di, dj) {
  const word =
    matrix[i + di]?.[j + dj] +
    matrix[i + 2 * di]?.[j + 2 * dj] +
    matrix[i + 3 * di]?.[j + 3 * dj];

  return word === 'MAS' ? 1 : 0;
}

fs.readFile(path.resolve(__dirname, 'data.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const matrix = data
    .trim()
    .split('\n')
    .map((row) => row.split(''));

  let xmasCount = 0;

  const directions = [
    [-1, 0], // UP
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
    [-1, 1], // NE
    [1, 1], // SE
    [1, -1], // SW
    [-1, -1], // NW
  ];

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];

    for (let j = 0; j < row.length; j++) {
      if (row[j] === 'X') {
        // Does 'XMAS' start from here?
        for ([di, dj] of directions) {
          xmasCount += checkDirection(matrix, i, j, di, dj);
        }
      }
    }
  }

  console.log(xmasCount);
});
