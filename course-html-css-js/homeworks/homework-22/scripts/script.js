// course-html-css-js/homeworks/homework-22/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 22

// Задание 1.
/* Создать функцию, которая будет изменять цвет фона элемента каждую секунду. Цвет должен меняться 
случайным образом из заданного набора цветов. */
// const colors = ['#ff0000', '#00ff00', '#0000ff'];

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const colors = ['#ff0000', '#00ff00', '#0000ff'];
let i = 0;

setInterval(() => {
  ctx.fillStyle = colors[i++ % colors.length];
  ctx.fillRect(100, 25, 100, 100);
}, 1000);

/* ===== END ===== */

const resourceUrl1 = `./scripts/script.js`;
const resourceUrl2 = `./styles/styles.css`;

fetchAsText(resourceUrl1, resourceUrl2).then(async (results) => {
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
