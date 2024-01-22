// Импорт необходимыx модулей:
const fs = require('fs');
const path = require('path');

// Пути к файлам и папкам
const nameFolder = '05-merge-styles'
const pathToFolderStyles = path.join(nameFolder, 'styles');
const pathToFolderProject = path.join(nameFolder, 'project-dist');
const pathToFileStyle = path.join(pathToFolderProject, 'bundle.css');

fs.readdir(pathToFolderStyles, (error, files) => {
  if (error) {
    console.log(`Error: ${error}`);
  }

  const arrayFiles = [];

  files.forEach((file) => {
    const pathToFile = path.join(pathToFolderStyles, file);
    fs.readFile(pathToFile, 'utf8', (error, data) => {
      if (error) {
        console.log(`Error: ${error}`);
      }
      if (path.extname(pathToFile) === '.css') {
        arrayFiles.push(data);
      }

      const styles = arrayFiles.join('\n');
      fs.writeFile(pathToFileStyle, styles, 'utf8', (error) => {
        if (error) {
          console.log(`Error: ${error}`);
        }
      });
    });
  });
});

