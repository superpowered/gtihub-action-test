import fs from "fs";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getEndpoints = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return [json[0], json[10], json[20]];
  } catch (error) {
    console.error(error.message);
    return undefined;
  }
};

const getData = async (id) => {
  // 1/3 chance of differnt data
  const hit = getRandomInt(id, id + 3);
  const url = "https://jsonplaceholder.typicode.com/posts/" + hit;
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

const validate = (res) => {
  if (!res) {
    console.error("Validation fail -- no object");
    return false;
  }
  if (!res?.id || !res?.userId || !res?.title || !res?.body) {
    console.error("Validation fail -- keys");
    return false;
  }
  if (
    Number.isNaN(res.id) ||
    Number.isNaN(res.userId) ||
    typeof res?.title !== "string" ||
    typeof res?.body !== "string"
  ) {
    console.error("Validation fail, -- types");
    return false;
  }

  return true;
};

const writeDefaultData = async () => {
  const endpoints = await getEndpoints();
  const updatedData = endpoints.map(async (item) => await getData(item.id));
  const results = await Promise.all(updatedData);
  results.map((res) => {
    if (!validate(res)) {
      return;
    }
    const filePath = `data/default-data-${res.userId}.json`;
    const data = JSON.stringify(res);
    // Asynchronous write using fs.writeFile
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.error("An error occurred:", filePath, err);
      } else {
        console.log("File written successfully!", filePath);
      }
    });
  });
};

await writeDefaultData();
