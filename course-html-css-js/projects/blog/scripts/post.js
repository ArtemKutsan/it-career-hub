// course-html-css-js/projects/blog/scripts/post.js

/* App Blog */
const BASE_URL = 'https://jsonplaceholder.typicode.com';

const params = new URLSearchParams(window.location.search);

const postId = params.get('postId');
// const authorId = params.get("authorId");

// Делаем заглавной первую букву в строке
const capitalizeFirstLetter = (str) => (str ? str[0].toUpperCase() + str.slice(1) : str);

// Удаляем переносы строк из текста
const removeLineBreaks = (text) => text.replace(/\n/g, ' ');

// Загрузка данных поста с автором и комментариями
const loadPost = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/posts/${postId}?_expand=user&_embed=comments`);

    if (!response.ok) throw new Error(`Error loading data: ${response.status}`);

    let post = await response.json();

    const title = capitalizeFirstLetter(post.title);
    const body = capitalizeFirstLetter(removeLineBreaks(post.body));
    const author = {
      id: post.user.id,
      name: capitalizeFirstLetter(post.user.name),
      email: post.user.email,
    };

    const comments = post.comments.map((comment) => {
      return {
        id: comment.id,
        name: comment.name,
        email: comment.email,
        body: removeLineBreaks(comment.body),
      };
    });

    post = { id, title, body, author, comments };

    // console.log(
    //   "// js // Объект post c автором (user) и комментариями (comments)",
    //   post
    // );

    return post;
  } catch (error) {
    console.error(error.message);
  }
};

const commentCard = (comment) => {
  return `
    <div class="comment mb-4 p-4 bg-lite text-sm">
      <span class="comment-name font-semibold">${capitalizeFirstLetter(comment.name)}</span>
      <p class="comment-body">${capitalizeFirstLetter(comment.body)}</p>
      <span class="comment-email text-sm text-lite">${comment.email}</span>
    </div>
  `;
};

const renderPost = (post) => {
  const postDiv = document.createElement('div');

  postDiv.classList.add('post');

  postDiv.innerHTML = `
    <h2 class="post-title">${post.title}</h2>
    <span class="post-author text-sm text-lite">
      Author: <a class="text-sm text-lite no-underline" href="./author.html?authorId=${
        post.author.id
      }">${post.author.name}</a>
    </span>
    <p class="post-body">${post.body}</p>
    <span class="post-author text-xs text-lite mb-2">Комментарии (${post.comments.length}):</span>
    ${post.comments.map((comment) => commentCard(comment)).join('')}`;

  document.querySelector('#post-content').appendChild(postDiv);
};

loadPost(postId).then(renderPost);
