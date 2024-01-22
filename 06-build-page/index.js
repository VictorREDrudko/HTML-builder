const path = require('path');
const {
  readdir,
  copyFile,
  rm,
  mkdir,
  readFile,
  writeFile,
} = require('fs/promises');

const distDir = path.join(__dirname, 'project-dist');
const templateDir = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');

// Создание папки project-dist
async function createFolderDist(dirName) {
  await rm(dirName, { recursive: true, force: true });
  await mkdir(dirName);
}

// Создание файла index.html в папке project-dist
async function createIndexFile() {
  let template = await readFile(templateDir);
  template = template.toString();
  const templateTags = template
    .match(/{{.+}}/gi)
    .map((tag) => tag.slice(2, tag.length - 2));

  const tags = {};
  for (let i = 0; i < templateTags.length; i += 1) {
    tags[templateTags[i]] = await readFile(
      componentsDir + `//${templateTags[i]}.html`,
    );
    tags[templateTags[i]] = tags[templateTags[i]].toString();
    let templateTemp = template.split(`{{${templateTags[i]}}}`);
    template = templateTemp[0] + tags[templateTags[i]] + templateTemp[1];
  }

  await writeFile(distDir + '//index.html', template);
}

// Компиляция стилей
async function compillingStyles() {
  let mergedStyle = [];
  const files = await readdir(stylesDir, { withFileTypes: true });
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(stylesDir, files[i].name);
    if (files[i].isFile() && path.extname(filePath) === '.css') {
      const fileContent = await readFile(filePath);
      mergedStyle.push(fileContent.toString());
    }

    await writeFile(distDir + '//style.css', mergedStyle.join('\n'));
  }
}

// Копирование assets
async function copyAssetsDir(dir, dirCopy) {
  const files = await readdir(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      await copyFile(dir + '//' + file.name, dirCopy + '//' + file.name);
    } else if (file.isDirectory()) {
      await mkdir(dirCopy + '//' + file.name);
      await copyAssetsDir(dir + '//' + file.name, dirCopy + '//' + file.name);
    }
  }
}

async function main() {
  await createFolderDist(distDir);
  await createFolderDist(distDir + '//assets');
  await createIndexFile();
  await compillingStyles();
  await copyAssetsDir(assetsDir, distDir + '//assets');
}

main().catch(console.error);
