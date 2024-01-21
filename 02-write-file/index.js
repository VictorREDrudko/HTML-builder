const fs = require('fs');
const path = require('path');

const pathToFile = './index.js';

fs.readFile(pathToFile, 'utf8', (error, data) => {
  fs.writeFile('./02-write-file/text.txt', 'enter text', () => {

  })
});
