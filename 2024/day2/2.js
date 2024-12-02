const fs = require('fs');
const path = require('path');
const isSafe = require('./isSafe');

function isSafeWithDampener(report) {
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];

    if (isSafe(modifiedReport)) {
      return true;
    }
  }

  return false;
}

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
    if (isSafe(report) || isSafeWithDampener(report)) {
      noOfSafeReports += 1;
    }
  }

  console.log('Safe reports:', noOfSafeReports);
});
