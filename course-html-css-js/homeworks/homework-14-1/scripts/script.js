// course-html-css-js/homeworks/homework-14-1/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 14.1
const waitForTime = (interval) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(`Ожидание ${interval} сек. завершено`);
    }, interval * 1000)
  );

let interval = 5; // секунды

console.log(
  `Вызываем функцию waitForTime возвращающую промис который зарезолвится через ${interval} секунд`
);

waitForTime(interval)
  .then((data) => console.log(data, 'Промис зарезолвился'))
  .catch((error) => console.error('Ошибка:', error));
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
