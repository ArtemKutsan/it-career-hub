/* course-html-css-js/lessons/59-2-lesson-38-2/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 59.2 Lesson 38.2
// Этот урок является продолжением урока 59.1 Lesson 38.1
// 4**. dynamic search {title, body}

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const searchContentUl = document.querySelector('#search-content');
const postsSearchInput = document.querySelector('#posts-search');
const cleanInputBtns = document.querySelectorAll('.clean-input-btn');

let posts = [];
let totalPosts = 0;

const capitalizeFirstLetter = (str) => (str ? str[0].toUpperCase() + str.slice(1) : '');

const searchPosts = (str) =>
  posts.filter(
    (post) => post.title.toLowerCase().includes(str) || post.body.toLowerCase().includes(str)
  );

const createPostPreviewEl = (post) => {
  const postPreviewLi = document.createElement('li');

  postPreviewLi.innerHTML = `
    <span class="font-bold text-accent">${capitalizeFirstLetter(post.title)}</span>
    <span class="text-sm line-clamp-1">${capitalizeFirstLetter(post.body)}</span>
  `;

  return postPreviewLi;
};

const renderSearchResults = (list) => {
  searchContentUl.innerHTML = `<span class='text-sm text-lite sticky top-0 z-10 bg-theme pb-4'>Найдено ${list.length} постов</span>`;

  list.forEach((post) => {
    const liEl = createPostPreviewEl(post);
    searchContentUl.appendChild(liEl);
  });
};

// Получение всех постов
const loadPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) throw new Error(`Load error: ${response.status}`);

  return response.json();
};

loadPosts().then((data) => {
  posts = data;
  totalPosts = posts.length;
});

postsSearchInput.addEventListener('input', (event) => {
  const searсhStr = event.target.value.trim().toLowerCase();
  if (searсhStr.length > 1) {
    const foundedPosts = searchPosts(searсhStr);
    renderSearchResults(foundedPosts);
  }
});

// Обработчики событий кнопок очистки введенной строки на всех input (text)
cleanInputBtns.forEach((button) =>
  button.addEventListener('click', (event) => {
    event.currentTarget.parentElement.querySelector('input').value = '';
    renderSearchResults([]);
  })
);

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
