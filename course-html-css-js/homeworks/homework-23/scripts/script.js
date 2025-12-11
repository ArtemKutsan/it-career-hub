// course-html-css-js/homeworks/homework-23/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 23

// Задание 1.
/* Реализовать функцию, которая будет создавать элементы списка на основе массива данных. Каждый 
элемент списка должен содержать кнопку, при нажатии на которую будет происходить удаление этого
элемента из списка. */
let todos = [
  { id: crypto.randomUUID().slice(0, 8), title: 'Купить продукты' },
  { id: crypto.randomUUID().slice(0, 8), title: 'Отослать отчет' },
  { id: crypto.randomUUID().slice(0, 8), title: 'Позвонить куратору' },
];

const todosListUl = document.querySelector('#todos-list');

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
};

const createTodoEl = (todo) => {
  const todoLi = document.createElement('li');

  todoLi.dataset.id = todo.id;
  todoLi.className = 'todo';
  todoLi.innerHTML = `
    <span>${todo.title}</span>
    <span class='delete-todo-btn material-symbols-outlined'>delete</span>
  `;

  return todoLi;
};

const renderTodos = () => {
  todosListUl.innerHTML = '';

  todos.forEach((todo) => {
    const liEl = createTodoEl(todo);
    todosListUl.appendChild(liEl);
  });
};

todosListUl.addEventListener('click', (event) => {
  const todoLi = event.target.closest('.todo');
  if (!todoLi) return;

  const id = todoLi.dataset.id;

  if (event.target.closest('.delete-todo-btn')) {
    deleteTodo(id);
    renderTodos();
  }
});

renderTodos();

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
