/* course-html-css-js/lessons/59-1-lesson-38-1/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 59.1 Lesson 38.1

/* Реализовать функционал переключения между постами. В качестве API использовать 
https://jsonplaceholder.typicode.com/posts/. */
/* Страница должна содержать 2 кнопки (вперед, назад), которые переключают к следующему и 
предыдущему посту соответственно. */
/* При загрузке страницы должен отправляться запрос на получение поста с id=1. */
// 1. validation for switchers < >
// 2. localStorage
// 3. loading
// 4**. dynamic search {title, body}

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const prevPostBtn = document.querySelector('#prev-post');
const nextPostBtn = document.querySelector('#next-post');
const postContent = document.querySelector('#post-content');

let currentPostId = Number(localStorage.getItem('postId')) || 1;
let posts = [];
let totalPosts = 0;

const capitalizeFirstLetter = (str) => (str ? str[0].toUpperCase() + str.slice(1) : '');

const removeLineBreaks = (text) => text.replace(/\n/g, ' ');

// Получение всех постов
const loadPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) throw new Error(`Load error: ${response.status}`);

  return response.json();
};

// Загрузка поста
const loadPost = async (id) => {
  const response = await fetch(`${BASE_URL}/posts/${id}?_expand=user&_embed=comments`);
  if (!response.ok) throw new Error(`Load error: ${response.status}`);

  return response.json();
};

// HTML комментария
// const commentCard = (comment) => `
//   <div class="comment mb-4 p-4 bg-lite text-sm">
//     <span class="comment-name font-semibold">${capitalizeFirstLetter(comment.name)}</span>
//     <p class="comment-body">${capitalizeFirstLetter(removeLineBreaks(comment.body))}</p>
//     <span class="comment-email text-sm text-lite">${comment.email}</span>
//   </div>
// `;

// Рендер поста
const renderPost = (post) => {
  const title = capitalizeFirstLetter(post.title);
  const body = capitalizeFirstLetter(removeLineBreaks(post.body));
  const author = post.user;

  postContent.innerHTML = `
    <div class="post">
      <h2 class="post-title text-primary">${title}</h2>
      <span class="post-author text-sm text-lite">
        Author:
        <a class="text-sm text-lite no-underline"
           href="./author.html?authorId=${author.id}">
          ${capitalizeFirstLetter(author.name)}
        </a>
      </span>
      <p class="post-body">${body}</p>
    </div>
  `;
};

// Обновление состояния кнопок
const updateButtons = () => {
  prevPostBtn.style.display = currentPostId <= 1 ? 'none' : 'block';
  nextPostBtn.style.display = currentPostId >= totalPosts ? 'none' : 'block';
};

// Обновление поста
const update = async () => {
  if (currentPostId < 1) currentPostId = 1;
  if (currentPostId > totalPosts) currentPostId = totalPosts;

  localStorage.setItem('postId', currentPostId);

  postContent.innerHTML = 'Loading…';

  const data = await loadPost(currentPostId);
  renderPost(data);

  updateButtons();
};

// Навигация
prevPostBtn.addEventListener('click', () => {
  if (currentPostId > 1) {
    currentPostId--;
    update();
  }
});

nextPostBtn.addEventListener('click', () => {
  if (currentPostId < totalPosts) {
    currentPostId++;
    update();
  }
});

loadPosts().then((data) => {
  posts = data;
  totalPosts = posts.length;
  update();
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

    // Удаляем из комментариев вида /* */ пеереносы строк (можно отключить)
    content = content.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/\r?\n+/g, ''));

    pre.textContent = content;
    const extension = url.split('.').pop();
    pre.classList.add(`language-${extension}`);
    codeBlock.appendChild(pre);
  }
  await highlightPreBlocks(codeBlock);
});
