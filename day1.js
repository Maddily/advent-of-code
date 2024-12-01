require('dotenv').config()

async function fetchInput() {
  try {
    const response = await fetch('https://adventofcode.com/2024/day/1/input', {
      headers: {
        Cookie:
          process.env.SESSION_COOKIE,
      },
    });
    const data = await response.text();
    return data.trim().split('\n');
  } catch (error) {
    console.error(error);
  }
}

// Calculate total distance
fetchInput().then((data) => {
  const dataArray = data.map((pair) => pair.split('   '));
  const leftList = dataArray.map((pair) => +pair[0]).sort();
  const rightList = dataArray.map((pair) => +pair[1]).sort();

  let totalDistance = 0;

  for (let i = 0; i < leftList.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }

  console.log('Total Distance:', totalDistance);
});

// Calculate similarity score
fetchInput().then((data) => {
  const dataArray = data.map((pair) => pair.split('   '));
  const leftList = dataArray.map((pair) => +pair[0]);
  const rightList = dataArray.map((pair) => +pair[1]);

  let similarityScore = 0;

  for (let i = 0; i < leftList.length; i++) {
    const count = rightList.reduce((acc, num) => num === leftList[i] ? acc + 1 : acc, 0);
    similarityScore += leftList[i] * count;
  }

  console.log('Similarity Score:', similarityScore);
});
