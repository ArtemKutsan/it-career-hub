// course-html-css-js/homeworks/homework-16-1/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 19

// Задание 1.
/* Создать объект counter, который будет иметь свойство count(по умолчанию значение равно 0) и 
методы increment и decrement для увеличения и уменьшения значения count соответственно. */
// Пример вызова методов increment и decrement
// counter.increment();
// console.log(counter.count); // Ожидаемый вывод: 1
// counter.decrement();
// console.log(counter.count); // Ожидаемый вывод: 0

const counter = {
  count: 0,
  increment() {
    this.count++;
  },
  decrement() {
    this.count--;
  },
};

counter.increment();
console.log(counter.count); // Ожидаемый вывод: 1

counter.decrement();
console.log(counter.count); // Ожидаемый вывод: 0
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
