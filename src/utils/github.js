import "dotenv/config";
import fs from "fs";

export const getUserContributions = async (username) => {
    const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;

    const variables = { username };

    const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    // console.dir(data, { depth: null });
    // fs.writeFileSync("contributions-sample.json", JSON.stringify(data));
    return data;
};

export const getSampleContribution = async (filePath) => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error("Error reading settings JSON file: ", err);
        return null;
    }
};
