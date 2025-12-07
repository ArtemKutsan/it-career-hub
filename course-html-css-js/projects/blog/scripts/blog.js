// course-html-css-js/projects/blog/scripts/post.js

/* App Blog */
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const postsUrl = `${BASE_URL}/posts`;
const usersUrl = `${BASE_URL}/users`;
const commentsUrl = `${BASE_URL}/comments`;

let blog = [];

// Количество постов на одной странице
const POSTS_PER_PAGE = 5;

// Текущая страница из URL
const params = new URLSearchParams(window.location.search);
const currentPage = parseInt(params.get('page')) || 1;

// Заглавная буква
const capitalizeFirstLetter = (str) => (str ? str[0].toUpperCase() + str.slice(1) : str);

// Загрузка данных
const loadData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

// Собираем массив постов
const postsPreviews = (posts, users, comments) =>
  posts.map((post) => {
    const author = users.find((user) => user.id === post.userId);
    const postComments = comments.filter((comment) => comment.postId === post.id);

    return {
      id: post.id,
      title: post.title,
      author: {
        id: author.id,
        name: author.name,
      },
      description: post.body.slice(0, 100) + '...',
      commentsQty: postComments.length,
    };
  });

// Рендер поста
const renderPostCard = (post) => {
  const postCardDiv = document.createElement('div');
  postCardDiv.className = 'py-4';

  postCardDiv.innerHTML = `
    <a class="text-sm text-lite no-underline" href="./author.html?authorId=${post.author.id}">
      ${post.author.name}
    </a>
    <h4 class="">${capitalizeFirstLetter(post.title)}</h4>
    <p class="mb-2">
      ${capitalizeFirstLetter(post.description)}
      <a class="link text-sm" href="./post.html?postId=${post.id}" data-id="${post.id}">
        Читать далее
      </a>
    </p>
    <span class="text-xs text-lite">Комментарии: ${post.commentsQty}</span>
  `;

  document.querySelector('#posts-list').appendChild(postCardDiv);
};

// Пагинация
const renderPagination = (totalPosts) => {
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const paginationDiv = document.querySelector('#pagination');
  if (!paginationDiv) return;

  paginationDiv.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement('a');
    link.href = `index.html?page=${i}`;
    link.textContent = i;

    link.className = i === currentPage ? 'link mx-1' : 'mx-1 text-lite no-underline';

    paginationDiv.appendChild(link);
  }
};

// Рендер страницы блога
const renderBlogPage = (blog) => {
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const pagePosts = blog.slice(start, end);

  const list = document.querySelector('#posts-list');
  list.innerHTML = '';

  pagePosts.forEach((post) => renderPostCard(post));

  renderPagination(blog.length);
};

// Основная загрузка
Promise.all([loadData(postsUrl), loadData(usersUrl), loadData(commentsUrl)]).then(
  ([postsData, usersData, commentsData]) => {
    blog = postsPreviews(postsData, usersData, commentsData);
    renderBlogPage(blog);
  }
);

// Главная страница - лента постов:
// Отобразить карточки постов. В каждой карточке:
// Заголовок поста
// Имя автора (найти по userId)
// Первые 100 символов текста поста + "..."
// Количество комментариев к этому посту
// Кнопка "Читать далее"

// Фильтрация:
// Выпадающий список с авторами (все пользователи)
// При выборе автора показывать только его посты
// Кнопка "Сбросить фильтр" для показа всех постов

// Страница отдельного поста:
// При клике на "Читать далее" или заголовок поста:
// Скрыть ленту постов
// Показать детальную страницу поста
// Отобразить: полный заголовок, полный текст, имя автора
// Список всех комментариев к этому посту (имя комментатора + текст)

// Навигация:
// Кнопка "Назад к ленте" на странице поста
// Заголовок сайта (который всегда ведет на главную)

// Создание нового поста:
// Форма над лентой постов с полями:
// Заголовок (input)
// Текст поста (textarea)
// Выбор автора (select)

// При отправке:
// Добавить новый пост в начало локального массива
// Немедленно отобразить его в ленте
// Очистить форму

// Поиск по постам:
// Поле поиска над лентой
// Поиск работает по заголовку и тексту поста
// Поиск должен работать совместно с фильтром по автору

// API Endpoints:

// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/users
// https://jsonplaceholder.typicode.com/comments
