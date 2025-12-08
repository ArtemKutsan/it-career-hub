// course-html-css-js/homeworks/homework-20/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 21

// Задание 1.
/* Создайте класс CopyEntity. У него должен быть статический метод copyObject, который бы копировал
любой объект. Метод copyObject принимает любой объект и возвращает его копию. */

class CopyEntity {
  static copyObject(obj) {
    return structuredClone(obj);
  }
}

const arr1 = [1, 2, 3];
const arr2 = CopyEntity.copyObject(arr1);

arr2[0] = 999;

console.log('Оригинальный объект:', arr1, 'Измененная копия:', arr2);

const obj1 = {
  name: 'Artem',
  age: 44,
};

const obj2 = CopyEntity.copyObject(obj1);
obj2.name = 'Alice';

console.log('Оригинальный объект:', obj1, 'Измененная копия:', obj2);
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
