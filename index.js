import fs from "fs";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getData = async () => {
  const number = getRandomInt(1, 100);
  const url = "https://jsonplaceholder.typicode.com/posts/" + number;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    return undefined;
  }
};

const writeDefaultData = async () => {
  const result = await getData();
  const filePath = `default-data.json`;
  const data = JSON.stringify(result);
  // Asynchronous write using fs.writeFile
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("An error occurred:", err);
    } else {
      console.log("File written successfully!");
    }
  });
};

await writeDefaultData();
