import fs from 'fs';

const getData = async () => {
  const url = "https://jsonplaceholder.typicode.com/posts/1";
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
}

const result = await getData();
console.log(result);

// Define the file path and data to write
const filePath = 'example.txt';
const data = JSON.stringify(result);

// Asynchronous write using fs.writeFile
fs.writeFile(filePath, data, (err) => {
  if (err) {
    console.error('An error occurred:', err);
  } else {
    console.log('File written successfully!');
  }
});

// Synchronous write using fs.writeFileSync
try {
  fs.writeFileSync(filePath, data);
  console.log('File written successfully (synchronously)!');
} catch (err) {
  console.error('An error occurred (synchronously):', err);
}
