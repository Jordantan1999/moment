import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

// Setup
const git = simpleGit();
const filePath = "./data.json";
const TOTAL_DAYS = 365;

// Helper to get random integer between min and max (inclusive)
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makeCommits = async () => {
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const date = moment().subtract(1, 'year').add(i, 'days');
    const commitsToday = getRandomInt(1, 20); // Random number of commits for the day

    for (let j = 0; j < commitsToday; j++) {
      const timestamp = date.format();

      const data = {
        date: timestamp,
        commitNumber: j + 1,
      };

      await jsonfile.writeFile(filePath, data);
      await git.add([filePath]);
      await git.commit(`Commit ${j + 1} on ${timestamp}`, {
        '--date': timestamp,
      });
    }

    console.log(`✅ ${commitsToday} commits on ${date.format("YYYY-MM-DD")}`);
  }

  // Push everything at the end
  await git.push();
};

makeCommits();
