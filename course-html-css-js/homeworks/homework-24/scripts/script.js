// course-html-css-js/homeworks/homework-24/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 24

// Задание 1.
/* К выполненному проекту “Модальное окно dialog” 62.1 Урок 39.1 необходимо добавить функционал 
закрытия модального окна при клике на свободное пространство вне модального окна. Для выполнения 
данного задания необходимо использовать код с урока. */
const openModalBtn = document.querySelector('#open-modal');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const closeModalBtn = document.querySelector('#close-modal');

const openModal = () => {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
};

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', closeModal);

modalBody.addEventListener('click', (event) => {
  event.stopPropagation();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
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
