const fs = require('fs');
const path = require('path');
const { promises: fsPromises } = require('fs');

// Пути к папкам:
const pathToFolder = './04-copy-directory/files';
const pathToFolderCopy = './04-copy-directory/files-copy';

// Создадим асинхронную функцию:
async function copyDir() {
  try {
    await fsPromises.mkdir(pathToFolderCopy, {
      recursive: true,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  try {
    const files = await fsPromises.readdir(pathToFolder);
    for (const file of files) {
      await fsPromises.copyFile(`${pathToFolder}/${file}`, `${pathToFolderCopy}/${file}`);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

copyDir();
