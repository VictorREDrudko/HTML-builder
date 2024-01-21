// Подключаем необходимые модули
// 1.МОДУЛЬ ФАЙЛОВОЙ СИСТЕМЫ:
const fs = require('fs');
// 2.МОДУЛЬ ДЛЯ РАБОТЫ С ПУТЯМИ:
const path = require('path');

// Путь к файлу, который нужно прочитать:
const pathToFile = './01-read-file/text.txt';

//Создаем читающий поток
const streamRead = fs.createReadStream(pathToFile);

// Взаимодействие с читающим потоком (через метод .on)
streamRead.on('data', (part) => {
    console.log(part.toString());
});

// Вывод содержимого файла text.txt в консоль (метод fs.readFile):
// ВАРИАНТ 1:
// путь к файлу + колбэк функция (error - содержит сведения о проблемах, если чтение файла не удалось)
// fs.readFile(pathToFile, (error, data) => {
//   console.log(data.toString());
// });

// ВАРИАНТ 2 (с указанием кодировки utf8):
// fs.readFile(pathToFile, 'utf8', (error, data) => {
//   console.log(data);
// });



