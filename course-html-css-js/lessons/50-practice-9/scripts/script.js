/* course-html-css-js/lessons/55-practice-10/scripts/scripts.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */

// Practice 9
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const albums_1_7_12_Url = `${BASE_URL}/albums?id=1&id=7&id=12`;

// Задание 1.
/* Необходимо сделать запрос к API и получить данные об альбоме (albums) по его 
идентификатору. Используйте fetch для получения данных. Обработайте возможные ошибки с помощью 
try/catch. Используем https://jsonplaceholder.typicode.com/albums. Получить данные об 1, 7 и 12 
альбоме и все полученную информацию используйте для отрисовки карточек на веб странице. */

// 1.
const loadData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    // console.log(data);

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const createAlbumCard = (album) => console.log(`// js // Задание 1\n// Album ${album.id}`, album);

const renderAlbums = (albums) => albums.forEach((album) => createAlbumCard(album));

const getAlbumsData = async (url) => loadData(url);

getAlbumsData(albums_1_7_12_Url).then(renderAlbums);

// Задание 2.
/* Необходимо задержать выполнение функции на 2 секунды с помощью setTimeout. 
Используйте async/await для выполнения этой задержки. */

// 2.
const delayExecution = async (func, delay) => {
  await new Promise((resolve) => setTimeout(resolve, delay * 1000));
  func();
};

// const delayExecution = (func, delay) => {
//   setTimeout(() => func(), delay * 1000);
// };

const delayInSeconds = 2;

delayExecution(
  () => console.log('Задание 2:', `Delayed in ${delayInSeconds} seconds!`),
  delayInSeconds
);

// Задание 3.
/* Необходимо написать функцию parseJSON, которая должна распарсить строку 
'{"name": "John", "age": 30}' в формате JSON. Обработайте возможные ошибки с помощью 
try/catch. */

// 3.
const parseJSON = (jsonString) => {
  try {
    const parsedData = JSON.parse(jsonString);
    // console.log(parsedData);

    return parsedData;
  } catch (error) {
    console.error('Invalid JSON string:', error.message);
  }
};

const jsonString = '{"name": "John", "age": 30}';

console.log('// js // Задание 3\n// Parsed JSON string', parseJSON(jsonString));

// Задание 4.
/* Необходимо создать функцию getRandomNumber, которая возвращает промис, который будет 
возвращать случайное число с задержкой в 1 секунду, таким образом мы имитируем некоторый процесс 
обрабатывающий логику генерации случайного числа. Используйте async/await для ожидания выполнения 
промиса. Не забудьте обработать асинхронный вызов функции. processRandomNumber будет "ожидать" 
получение (генерации) числа. */

// 4.
const getRandomNumber = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      resolve(randomNumber);
    }, 1000);
  });

const processRandomNumber = async () => {
  try {
    const randomNumber = await getRandomNumber();
    // console.log(`Generated random number: ${randomNumber}`);

    return randomNumber;
  } catch (error) {
    console.error(`Error generating random number: ${error.message}`);
  }
};

processRandomNumber().then((result) => console.log('Задание 4', `Random number: ${result}`));

// Задание 5. **
/* Необходимо получить HTML-код веб-страницы по ее URL и распарсить его для 
извлечения нужной информации, наприимер Title. Используйте fetch для загрузки HTML и DOMParser для 
парсинга. Для выполнения данного задания может потребоваться расширение google chrome 
CORS Unblock. */
// parseHTML("https://example.com") // можно попробовать https://www.heroku.com/
//   .then((title) => console.log("Page title:", title))
//   .catch((error) => console.error(error)); */

// 5.
const parseHTML = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to get HTML page');

    const textData = await response.text();
    const parser = new DOMParser();
    const html = parser.parseFromString(textData, 'text/html');
    const title = html.querySelector('title').textContent;
    // console.log(title);

    return title;
  } catch (error) {
    console.log(error.message);
  }
};

parseHTML('https://example.com').then((result) =>
  console.log('Задание 5', `Page title: ${result}`)
);
/* ===== END ===== */

const resourceUrl = `./scripts/script.js`;

fetchAsText(resourceUrl).then(async (results) => {
  const codeBlock = document.querySelector('#code-block');
  if (!codeBlock) return;

  for (let result of results) {
    let content = result.text; // текст из объекта
    const url = result.url; // URL для дальнейшего использования в extension

    const pre = document.createElement('pre');

    // Берем только контент между START и END
    const match = content.match(
      /(\/\*\s*===== START =====\s*\*\/|<!--\s*===== START =====\s*-->)([\s\S]*?)(\/\*\s*===== END =====\s*\*\/|<!--\s*===== END =====\s*-->)/
    );

    if (match) content = match[2].trim();

    // Удаляем из комментариев вида /* */ пеереносы строк (можно отключить)
    content = content.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/\r?\n+/g, ''));

    pre.textContent = content;
    const extension = url.split('.').pop();
    pre.classList.add(`language-${extension}`);
    codeBlock.appendChild(pre);
  }
  await highlightPreBlocks(codeBlock);
});
