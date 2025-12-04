// course-html-css-js/homeworks/homework-16-1/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 15
/* Необходимо сделать запрос на https://jsonplaceholder.typicode.com/. 
По пути (path)/users получить всех пользователей. На веб-странице для каждого 
пользователя отрисовать карточку и указать следующие данные: 
id, username, email, address.city, phone и company.name. Стили добавляем произвольно. 
*/
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const usersUrl = `${BASE_URL}/users`;

fetch(usersUrl)
  .then((response) => response.json())
  .then((users) =>
    users.forEach((user) =>
      console.log(
        `// txt id: ${user.id}\nusername: ${user.username}\nemail: ${user.email}\ncity: ${user.address.city}\nphone: ${user.phone}\ncompany: ${user.company.name}`
      )
    )
  )
  .catch(console.error);
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
