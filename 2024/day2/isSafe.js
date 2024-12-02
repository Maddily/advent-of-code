function isSafe(report) {
  if (report.length < 2) return true;

  let increasing = false,
    decreasing = false;

  if (report[0] < report[1]) {
    increasing = true;
  } else if (report[0] > report[1]) {
    decreasing = true;
  } else {
    return false;
  }

  for (let i = 0; i < report.length - 1; i++) {
    const difference = Math.abs(report[i] - report[i + 1]);

    if (difference < 1 || difference > 3) {
      return false;
    }

    if (increasing && report[i] > report[i + 1]) {
      return false;
    }

    if (decreasing && report[i] < report[i + 1]) {
      return false;
    }
  }

  return true;
}

module.exports = isSafe;
