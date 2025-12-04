const navEl = document.querySelector('nav');
const navList = document.querySelector('header nav > ul');

const generateNavItems = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const authToken = localStorage.getItem('authToken');
  const isUserAuth = authToken ? users.filter((user) => user.token === authToken)[0] : null;

  const hostname = window.location.hostname;
  const pathname = window.location.pathname;
  const isGitHub = hostname.includes('github.io');

  let baseHref = '/'; // Значение по умолчанию для локальной разработки

  if (isGitHub && pathname.startsWith('/')) {
    // Извлекаем имя репозитория: первый сегмент пути после корня (например, '/repo-name/' → 'repo-name')
    const repoName = pathname.split('/')[1];
    if (repoName) {
      // Проверяем, что сегмент существует (игнорируем корневой случай)
      baseHref = `/${repoName}/`;
    }
  }

  if (authToken && isUserAuth) {
    return [
      {
        text: 'Lessons',
        title: 'Go to Lessons page',
        href: `${baseHref}course-html-css-js/lessons/`,
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        text: 'Homeworks',
        title: 'Go to Homeworks page',
        href: `${baseHref}course-html-css-js/homeworks/`,
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        title: 'Projects',
        type: 'menu',
        items: [
          {
            text: 'Login/Register',
            title: 'Open Authorization',
            href: `${baseHref}course-html-css-js/projects/auth`,
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'Todo.App',
            title: 'Open Todo.App',
            href: `${baseHref}course-html-css-js/projects/app-todo`,
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'Corp Todo Viewer',
            title: 'Open Corp Todo Viewer',
            href: `${baseHref}course-html-css-js/projects/corp-todo-viewer`,
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'Blog',
            title: 'Open Blog',
            href: `${baseHref}course-html-css-js/projects/blog`,
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
        ],
      },
      {
        text: '',
        title: 'Open Profile',
        href: `${baseHref}course-html-css-js/projects/auth/profile.html`,
        type: 'link',
        class: 'btn btn-ghost',
        icon: '<i class="bi bi-person-fill text-lg"></i>',
      },
      {
        text: '',
        title: 'Logout',
        type: 'button',
        class: 'logout btn btn-ghost',
        icon: '<i class="bi bi-box-arrow-right text-lg"></i>',
      },
    ];
  } else {
    return [
      {
        text: 'Lessons',
        title: 'Go to Lessons page',
        href: `${baseHref}course-html-css-js/lessons`,
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        text: 'Homeworks',
        title: 'Go to Homeworks page',
        href: `${baseHref}course-html-css-js/homeworks`,
        type: 'link',
        class: 'mx-1',
        icon: '',
      },
      {
        title: 'Projects',
        type: 'menu',
        items: [
          {
            text: 'Login/Register',
            title: 'Open Authorization',
            href: `${baseHref}course-html-css-js/projects/auth`,
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'Todo.App',
            title: 'Open Todo.App',
            href: `${baseHref}course-html-css-js/projects/app-todo`,
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'Corp Todo Viewer',
            title: 'Open Corp Todo Viewer',
            href: `${baseHref}course-html-css-js/projects/corp-todo-viewer`,
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
          {
            text: 'Blog',
            title: 'Open Blog',
            href: `${baseHref}course-html-css-js/projects/blog`,
            type: 'link',
            class: 'mx-1 text-sm',
            icon: '',
          },
        ],
      },
    ];
  }
};

const navItems = generateNavItems();

// Создание обычной ссылки навигации
const createLinkEl = (link) => {
  const liEl = document.createElement('li');

  liEl.innerHTML = link.icon
    ? link.text
      ? `<a title="${link.title}" class="${link.class}" href="${link.href}">${link.icon}<span>${link.text}</span></a>`
      : `<a title="${link.title}" class="${link.class}" href="${link.href}">${link.icon}</a>`
    : `<a title="${link.title}" class="${link.class}" href="${link.href}">${link.text}</a>`;

  return liEl;
};

// Создание кнопки навигации
const createButtonEl = (button) => {
  const buttonEl = document.createElement('button');
  buttonEl.className = button.class;
  buttonEl.title = button.title;

  buttonEl.innerHTML = button.icon
    ? button.text
      ? `${button.icon}<span>${button.text}</span>`
      : `${button.icon}`
    : `${button.text}`;

  return buttonEl;
};

// Создание выпадающего меню навигации
const createMenuEl = (menu) => {
  const liEl = document.createElement('li');
  liEl.className = 'dropdown';

  const buttonEl = document.createElement('button');
  buttonEl.className = 'btn btn-invisible mx-1';
  buttonEl.title = menu.title || '';
  buttonEl.textContent = menu.title || 'Menu';

  const menuUlEl = document.createElement('ul');
  menuUlEl.className = 'dropdown-content';

  menu.items.forEach((item) => {
    if (item.type !== 'link') return;

    const menuLiEl = document.createElement('li');
    menuLiEl.innerHTML = `<a title="${item.title}" class="${item.class}" href="${item.href}">
      ${item.icon || ''}${item.text}
    </a>`;

    menuUlEl.appendChild(menuLiEl);
  });

  liEl.appendChild(buttonEl);
  liEl.appendChild(menuUlEl);

  return liEl;
};

// Рендер всей навигации
const navRender = (navEl, navList, navItems) => {
  navItems.forEach((item) => {
    if (item.type === 'link') {
      navList.appendChild(createLinkEl(item));
      return;
    }

    if (item.type === 'button') {
      navEl.appendChild(createButtonEl(item));
      return;
    }

    if (item.type === 'menu') {
      navList.appendChild(createMenuEl(item));
      return;
    }
  });
};

navRender(navEl, navList, navItems);

const logoutBtns = document.querySelectorAll('.logout');

logoutBtns.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    localStorage.removeItem('authToken');
    window.location.pathname = 'index.html';
  });
});
