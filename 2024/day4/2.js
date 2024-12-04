const fs = require('fs');
const path = require('path');

function checkDiagonal(matrix, i, j, di, dj) {
  const next1 = matrix[i + di]?.[j + dj];
  const next2 = matrix[i + 2 * di]?.[j + 2 * dj];
  const opposite = matrix[i + 2 * di]?.[j];
  const end = matrix[i][j + 2 * dj];

  if (next1 + next2 === 'AS') {
    if (
      (end === 'M' && opposite === 'S') ||
      (end === 'S' && opposite === 'M')
    ) {
      return 1;
    }
  }

  return 0;
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
    [-1, 1], // NE
    [1, 1], // SE
    [1, -1], // SW
    [-1, -1], // NW
  ];

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i];

    for (let j = 0; j < row.length; j++) {
      if (row[j] === 'M') {
        // Does 'MAS' start from here?
        for (const [di, dj] of directions) {
          xmasCount += checkDiagonal(matrix, i, j, di, dj);
        }
      }
    }
  }

  console.log(xmasCount / 2);
});
