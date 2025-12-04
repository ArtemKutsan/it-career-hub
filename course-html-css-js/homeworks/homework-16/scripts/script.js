// course-html-css-js/homeworks/homework-16/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 16
// Задание 1.
/* Используя синтаксис async/await отправить get запрос на 
https://jsonplaceholder.typicode.com/todos/1. Результат вывести в консоль. */

// Задание 2.
/* Используя синтаксис async/await отправить get запрос на 
https://jsonplaceholder.typicode.com/posts. Ответ должен содержать 10 элементов 
(query-параметр _limit). Результат вывести в консоль. */

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const todo1Url = `${BASE_URL}/todos/1`;
const tenPostsUrl = `${BASE_URL}/posts?_limit=10`;

// Задания 1 и 2
const loadData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    console.log(`// js // ${url}`, data);
  } catch (error) {
    console.error(error.message);
  }
};

loadData(todo1Url);
loadData(tenPostsUrl);
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
