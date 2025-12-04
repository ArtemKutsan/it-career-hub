// course-html-css-js/homeworks/homework-16-1/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 16.1
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const postsUserId1 = `${BASE_URL}/posts?userId=1`;
const errorUrl = `${BASE_URL}/errorUrl`;

// Задание 1.
/* Используя синтаксис try/catch, отправить запрос на 
https://jsonplaceholder.typicode.com/posts?userId=1, в блоке catch сделать вывод консоль сообщения 
об ошибке. Для проверки блока catch сделать намеренную ошибку в url запроса. */
const loadData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

loadData(errorUrl);
// loadData(postsUserId1);

// Задание 2.
/* Написать функцию, которая делит одно число на другое, обрабатывая возможные ошибки деления на 
ноль. */
const div = (a, b) => {
  try {
    if (!b) throw new Error('Ошибка: Деление на 0!');
    return a / b;
  } catch (error) {
    return error.message;
  }
};

console.log(`10 / 5 = ${div(10, 5)}`);
console.log(`10 / 0 = ${div(10, 0)}`);
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

    content = content.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/\r?\n+/g, ''));

    pre.textContent = content;
    const extension = url.split('.').pop();
    pre.classList.add(`language-${extension}`);
    codeBlock.appendChild(pre);
  }
  await highlightPreBlocks(codeBlock);
});
