// Подключаем необходимые модули
const fs = require('fs');
const path = require('path');

// Путь к папке, в которой нужно прочитать данные:
const pathToFolder = path.join(__dirname, 'secret-folder');

// Прочитать директорию (содержимое папки) с помощью метода readdir:
fs.readdir(pathToFolder, 'utf8', (error, elements) => {
  if (error) {
    console.log(`Error: ${error}`);
  }

  elements.forEach((item) => {
    // путь к каждому файлу
    const pathToFile = path.join(pathToFolder, item);
    // сведения о файлач с использованием метода stat
    fs.stat(pathToFile, (error, stats) => {
      if (error) {
        console.log(`Error: ${error}`);
      }
      if (stats.isFile()) {
        console.log(
          `file name: ${item} - extension: ${path.extname(item)} - size: ${stats.size}`,
        );
      }
    });
  });
});