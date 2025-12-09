/* course-html-css-js/lessons/58-1-lesson-38-1/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 58.1 Lesson 38.1

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

console.log(ctx);

ctx.fillStyle = 'rgba(233, 77, 53, 1)';
ctx.fillRect(10, 10, 60, 45);

ctx.fillStyle = 'rgba(32, 69, 105, 1)';
ctx.fillRect(30, 30, 60, 45);

ctx.lineWidth = 2;
ctx.strokeStyle = '#e94d35';
ctx.strokeRect(60, 60, 60, 45);

ctx.beginPath();
ctx.arc(120, 120, 25, 0, 2 * Math.PI);
ctx.fillStyle = 'rgba(233, 77, 53, 0.5)';
ctx.fill();

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

    // Удаляем из комментариев вида /* */ пеереносы строк (можно отключить)
    content = content.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/\r?\n+/g, ''));

    pre.textContent = content;
    const extension = url.split('.').pop();
    pre.classList.add(`language-${extension}`);
    codeBlock.appendChild(pre);
  }
  await highlightPreBlocks(codeBlock);
});
