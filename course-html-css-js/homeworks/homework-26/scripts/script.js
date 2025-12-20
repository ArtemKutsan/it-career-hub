/* course-html-css-js/homeworks/homework-26/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 26
/*  */
const sidebar = document.querySelector('.sidebar');
const sidebarMainMenu = sidebar.querySelector('#main-menu');
const sidebarOpenBtn = document.querySelector('#sidebar-open');
const sidebarCloseBtn = sidebar.querySelector('#sidebar-close');

const sidebarMenuItems = [
  {
    id: '1',
    title: 'Title 1',
    items: [
      {
        id: '1.1',
        title: 'Title 1.1',
      },
      {
        id: '1.2',
        title: 'Title 1.2',
      },
      {
        id: '1.3',
        title: 'Title 1.3',
      },
    ],
  },
  {
    id: '2',
    title: 'Title 2',
    items: [
      {
        id: '2.1',
        title: 'Title 2.1',
        items: [
          {
            id: '2.1.1',
            title: 'Title 2.1.1',
          },
          {
            id: '2.1.2',
            title: 'Title 2.1.2',
          },
          {
            id: '2.1.3',
            title: 'Title 2.1.3',
          },
        ],
      },
      {
        id: '2.2',
        title: 'Title 2.2',
      },
      {
        id: '2.3',
        title: 'Title 2.3',
      },
    ],
  },
  {
    id: '3',
    title: 'Title 3',
    items: [
      {
        id: '3.1',
        title: 'Title 3.1',
      },
      {
        id: '3.2',
        title: 'Title 3.2',
      },
      {
        id: '3.3',
        title: 'Title 3.3',
      },
    ],
  },
];

const renderSidebarMenuItems = (items, level = 0) => {
  const ulEl = document.createElement('ul');

  if (level > 0) {
    ulEl.className = 'ml-4 hidden';
  }

  items.forEach((item) => {
    const liEl = document.createElement('li');

    const itemDiv = document.createElement('div');
    itemDiv.className = 'menu-item';
    itemDiv.innerHTML = `<span>${item.title}</span>`;
    itemDiv.dataset.id = item.id;

    liEl.appendChild(itemDiv);

    if (item.items?.length) {
      const arrowSpan = document.createElement('span');
      arrowSpan.className = 'material-symbols-outlined text-lite';
      arrowSpan.textContent = 'arrow_right';
      itemDiv.appendChild(arrowSpan);
      liEl.appendChild(renderSidebarMenuItems(item.items, level + 1));
    }

    ulEl.appendChild(liEl);
  });

  return ulEl;
};

sidebarMainMenu.append(renderSidebarMenuItems(sidebarMenuItems));

sidebarMainMenu.addEventListener('click', (event) => {
  const itemEl = event.target.closest('.menu-item');
  if (!itemEl) return;

  const liEl = itemEl.parentElement;
  const submenu = liEl.querySelector(':scope > ul');

  // active — только визуальный выбор
  sidebarMainMenu
    .querySelectorAll('.menu-item.active')
    .forEach((el) => el.classList.remove('active'));

  itemEl.classList.add('active');

  if (!submenu) return;

  liEl.classList.toggle('expanded');
  submenu.classList.toggle('hidden');
});

sidebarOpenBtn.addEventListener('click', () => {
  // sidebar.classList.remove('hidden');
  sidebar.classList.add('show');
});

sidebarCloseBtn.addEventListener('click', () => {
  sidebar.classList.remove('show');
  // sidebar.classList.add('hidden');
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
