// Подключаем необходимые модули:
const fs = require('fs');
const path = require('path');
// интерфейс для чтения данных из потока Readable:
const readData = require('readline');

// Путь к файлу, который нужно создать и записать в него данные:
const pathToFile = './02-write-file/text.txt';

//Создаем записываемый поток в текстовый файл:
const streamWrite = fs.createWriteStream(pathToFile, {
  // Открыть файл для чтения и добавления. Файл создается, если он не существует.
  flags: 'a+',
});

// Сообщение в консоли
console.log('Hello! Input your text! (output enter - exit)');

// Создание интерфейса ввода данных по одной строке за раз:
const textInput = readData.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Запись введенного текста в файл или выход из поля ввода:
textInput.on('line', (text) => {
  if (text.toLowerCase() === 'exit') {
    console.log('The end! Text saved to text.txt (02-write-file)');
    textInput.close();
  } else {
    streamWrite.write(text + '\n');
    console.log('Text successfully written to text.txt (02-write-file)');
    textInput.prompt();
  }
});

// Остановка процесса записи текста:
textInput.on('close', () => {
  console.log('Text recording stopped');
  streamWrite.end();
});
