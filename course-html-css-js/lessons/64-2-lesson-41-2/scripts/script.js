/* course-html-css-js/lessons/64-2-lesson-41-2/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 64.2 Lesson 41.2
/*  */
const main = document.querySelector('main');
const form = document.querySelector('#order-form');
// const address = document.querySelector('#address');
// const price = document.querySelector('#price');
// const receiver = document.querySelector('#receiver');
const orderBtns = document.querySelector('#order-buttons');
const btnPaid = document.querySelector('#order-paid');
const btnSent = document.querySelector('#order-sent');
const btnReceived = document.querySelector('#order-received');

let notificationsSidebar = document.querySelector('#notifications-sidebar');
if (!notificationsSidebar) {
  notificationsSidebar = document.createElement('div');
  notificationsSidebar.id = 'notifications-sidebar';
  main.appendChild(notificationsSidebar);
}
const notifications = [];

class Notification {
  static count = 0;

  constructor(type, text) {
    this.id = this.constructor.count++;
    this.type = type;
    this.text = text;
    notifications.unshift(this);
  }
}

const renderNotifications = () => {
  if (!notificationsSidebar) return;
  notificationsSidebar.innerHTML = '';

  notifications.forEach((notification) => {
    const div = document.createElement('div');
    div.className = `notification ${notification.type} shadow`;
    div.dataset.id = String(notification.id);
    div.textContent = notification.text;

    // Кнопка закрытия (базовый обработчик)
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = `btn btn-ghost ${notification.type}`;
    closeBtn.textContent = 'x';
    closeBtn.addEventListener('click', (event) => {
      const id = Number(event.target.parentElement.dataset.id);
      const index = notifications.findIndex((notification) => notification.id === id);
      if (index !== -1) notifications.splice(index, 1);
      renderNotifications();
    });

    div.appendChild(closeBtn);
    notificationsSidebar.appendChild(div);
  });
};

/* ===== Обработчики событий ===== */
form.addEventListener('submit', (event) => {
  event.preventDefault();
  orderBtns.style.display = 'flex';
});

btnPaid.addEventListener('click', () => {
  const notification = new Notification('paid', 'Заказ оплачен');
  renderNotifications();
});

btnSent.addEventListener('click', () => {
  const notification = new Notification('sent', 'Заказ отправлен');
  renderNotifications();
});

btnReceived.addEventListener('click', () => {
  const notification = new Notification('received', 'Заказ получен');
  renderNotifications();
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
