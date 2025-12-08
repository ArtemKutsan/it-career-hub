/* course-html-css-js/lessons/57-1-lesson-36-1/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 57.2 Lesson 36.2

// Прототипирование filter
Array.prototype.myFilter = function (callback) {
  const filtered = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      filtered.push(this[i]);
    }
  }

  return filtered;
};

const nums1 = [1, 2, 3, 4, 5];
const evenNums = nums1.myFilter((num) => num % 2 === 0);
console.log(evenNums);

// Прототипирование find
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }

  // return undefined;
};

const users1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const user = users1.myFind((user) => user.id === 2);
console.log(user);

// Прототипирование reduce
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : this[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

const nums2 = [1, 2, 3, 4];
const sum = nums2.myReduce((acc, curr) => acc + curr, 0);
console.log(sum);

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
