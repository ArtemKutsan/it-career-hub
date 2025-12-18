/* course-html-css-js/lessons/64-2-lesson-41-2/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 64.2 Lesson 41.2
/*  */
const body = document.querySelector('body');
const orderForm = document.querySelector('#order-form');
const orderBtns = document.querySelector('#order-buttons');
const btnPaid = document.querySelector('#order-paid');
const btnSent = document.querySelector('#order-sent');
const btnReceived = document.querySelector('#order-received');
let notificationsSidebar = document.querySelector('#notifications-sidebar');

if (!notificationsSidebar) {
  notificationsSidebar = document.createElement('div');
  notificationsSidebar.id = 'notifications-sidebar';
  body.appendChild(notificationsSidebar);
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

const addNotification = (notification) => {
  const notificationDiv = document.createElement('div');
  notificationDiv.className = `notification ${notification.type} text-light shadow`;
  notificationDiv.dataset.id = String(notification.id);
  notificationDiv.textContent = notification.text;

  const closeBtn = document.createElement('button');
  closeBtn.className = `close-notification-btn btn btn-invisible ${notification.type}`;
  closeBtn.innerHTML = `<span class="text-light text-sm material-symbols-outlined">close</span>`;
  notificationDiv.appendChild(closeBtn);

  notificationsSidebar.prepend(notificationDiv);

  // Принудительно вызываем reflow
  notificationDiv.offsetHeight;

  notificationDiv.classList.add('show');

  setTimeout(() => {
    notificationDiv.remove();
    notifications.pop();
  }, 5000);
};

/* ===== Обработчики событий ===== */
orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // setTimeout(() => (orderBtns.style.display = 'flex'), 2000);
  orderBtns.style.display = 'flex';
});

btnPaid.addEventListener('click', () => {
  const notification = new Notification('paid', 'Заказ оплачен');
  addNotification(notification);
});

btnSent.addEventListener('click', () => {
  const notification = new Notification('sent', 'Заказ отправлен');
  addNotification(notification);
});

btnReceived.addEventListener('click', () => {
  const notification = new Notification('received', 'Заказ получен');
  addNotification(notification);
});

// Обработка кликов по элементам в списке уведомлений (один обработчик на весь контейнер)
notificationsSidebar.addEventListener('click', (event) => {
  const notificationEl = event.target.closest('.notification');
  if (!notificationEl) return;
  const id = Number(notificationEl.dataset.id);

  if (event.target.closest('.close-notification-btn')) {
    const index = notifications.findIndex((notification) => notification.id === id);
    if (index !== -1) {
      notifications.splice(index, 1);
      notificationEl.remove();
    }
    return;
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

    // Удаляем из комментариев вида /* */ пеереносы строк (можно отключить)
    content = content.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/\r?\n+/g, ''));

    pre.textContent = content;
    const extension = url.split('.').pop();
    pre.classList.add(`language-${extension}`);
    codeBlock.appendChild(pre);
  }
  await highlightPreBlocks(codeBlock);
});
