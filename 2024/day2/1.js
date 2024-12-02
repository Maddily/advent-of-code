const fs = require('fs');
const path = require('path');
const isSafe = require('./isSafe');

fs.readFile(path.resolve(__dirname, 'data.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let noOfSafeReports = 0;

  const reports = data
    .trim()
    .split('\n')
    .map((report) => report.split(' ').map((level) => +level));

  for (const report of reports) {
    if (isSafe(report)) {
      noOfSafeReports += 1;
    }
  }

  console.log('Safe reports:', noOfSafeReports);
});
