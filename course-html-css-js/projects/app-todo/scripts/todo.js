/* App Todo */

// Ключи для localStorage
const todosKey = 'todos';
const trashKey = 'trash';

// Тестовые данные при первом запуске (при пустом localStorage)
const mockTodosData = [
  {
    id: '8888bb96',
    title: 'Позвонить куратору',
    completed: false,
    date: Date.now() - 3600_000,
    createdAt: Date.now(),
  },
  {
    id: 'f78e98b3',
    title: 'Отправить отчет',
    completed: false,
    date: Date.now() + 3600_000,
    createdAt: Date.now(),
  },
  {
    id: '3e8de8a2',
    title: 'Протестировать приложение Todo.App',
    completed: false,
    date: Date.now() + 2 * 3600_000,
    createdAt: Date.now(),
  },
  {
    id: '88bb9688',
    title: 'Купить продукты',
    completed: false,
    date: Date.now() + 6 * 3600_000,
    createdAt: Date.now(),
  },
  {
    id: 'c3958f89',
    title: 'Залить проект на GitHub',
    completed: false,
    date: Date.now() + 24 * 3600_000,
    createdAt: Date.now(),
  },
  {
    id: 'c8f9a767',
    title: 'Создать ветку для релиза Todo.App',
    completed: false,
    date: Date.now() + 48 * 3600_000,
    createdAt: Date.now(),
  },
  {
    id: 'e78c78ff',
    title: 'Заказать пиццу на вечер',
    completed: true,
    date: Date.now() + 3 * 3600_000,
    createdAt: Date.now() + 3 * 3600_000,
  },
];

// Тестовые данные при первом запуске (при пустом localStorage)
mockTrashData = [
  {
    id: 'a3e48f31',
    title: 'Купить батарейки',
    completed: true,
    date: Date.now() - 48 * 3600_000,
    createdAt: Date.now() - 96 * 3600_000,
    deleted: true,
  },
];

// Основные массивы задач в памяти
let todos = getData(todosKey) || mockTodosData;
let trash = getData(trashKey) || mockTrashData;

// id редактируемой задачи
let currentEditingId = null;

// DOM элементы
const todosListEl = document.querySelector('#todos-list');
const todosFilterEls = document.querySelectorAll('.todos-filter');
const todosSearchEl = document.querySelector('#todos-search');
const cleanInputBtnEls = document.querySelectorAll('.clean-input-btn');
const addTodoBtnEl = document.querySelector('#add-todo-btn');
const todoDialogEl = document.querySelector('#todo-dialog');
const todoDialogActionBtnEl = document.querySelector('#todo-dialog-action-btn');
const cancelBtnEl = document.querySelector('#cancel-btn');

// Определяем текущий день недели и дату
const weekday = new Date().toLocaleString('ru-RU', { weekday: 'long' });
const date = new Date().toLocaleString('ru-RU', {
  day: 'numeric',
  month: 'long',
});

// Отображаем текущую дату в заголовке приложения
document.querySelector('.current-weekday').textContent = capitalizeFirstLetter(weekday);
document.querySelector('.current-date').textContent = date;

// Получение данных из localStorage
function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Сохранение данных в localStorage
const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

// Выбирает слово с правильным окончанием в зависимости от числа
const pluralize = (n, one, few, many) => {
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  const last = abs % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return many;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
};

// Заглавная первая буква
function capitalizeFirstLetter(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : str;
}

// Поиск задачи по id
const findTodo = (id) => todos.find((todo) => todo.id === id);

// Фильтр по статусу выполнения
const filterByStatus = (list, status) => {
  const today = new Date();
  // Обнуляем время, чтобы сравнивать только дату
  today.setHours(23, 59, 59, 999);

  return status === 'active'
    ? list.filter((todo) => !todo.completed) // активные задачи
    : status === 'done'
    ? list.filter((todo) => todo.completed) // завершеннык задачи
    : status === 'actual'
    ? list.filter((todo) => !todo.completed && new Date(todo.date) <= today) // актуальные задачи (на сегодня)
    : status === 'deleted'
    ? trash // массив удаленных задач
    : list; // все задачи без удаленных
};

// Фильтр по строке
const filterByString = (list, str) =>
  str ? list.filter((todo) => todo.title.toLowerCase().includes(str)) : list;

// Сортировка: сначала по выполнению, затем по дате
const plannedOrder = {
  expired: 0,
  current: 1,
  soon: 2,
  today: 3,
  tomorrow: 4,
  later: 5,
};

const sortTodos = (list) =>
  list.slice().sort((a, b) => {
    // 1. Сначала по выполнению (false < true)
    if (a.completed !== b.completed) return a.completed - b.completed;

    // 2. Активные: сортировка по planned
    if (!a.completed && a.planned !== b.planned)
      return plannedOrder[a.planned] - plannedOrder[b.planned];

    // 3. Сортировка по дате внутри категории
    return a.date - b.date;
  });

// Добавление задачи
const addTodo = (title, date) => {
  todos.push({
    id: crypto.randomUUID().slice(0, 8),
    title,
    completed: false,
    date: date.getTime(),
    createdAt: Date.now(),
  });

  setData(todosKey, todos);
  schedulePlannedUpdate(); // вынести из функции!!!
};

// Изменение задачи
const editTodo = (id, title, date) => {
  const todo = findTodo(id);
  if (!todo) return;

  todo.title = title;
  todo.date = date.getTime();

  setData(todosKey, todos);
  schedulePlannedUpdate(); // вынести из функции!!!
};

// Пермещение в корзину
// const moveToTrash = (todo) => {};

// Переключение состояния выполнено/не выполнено
const toggleTodo = (id) => {
  const todo = findTodo(id);
  if (!todo) return;

  todo.completed = !todo.completed;

  setData(todosKey, todos);
  schedulePlannedUpdate(); // вынести из функции!!!
};

// Подсчет кол-ва актуальных (сегодняшник) todo вместе с просроченными
const countActualTodos = () => {
  const today = new Date();
  // Обнуляем время, чтобы сравнивать только дату
  today.setHours(23, 59, 59, 999);
  const { actualQty, expiredQty } = todos.reduce(
    (acc, curr) => {
      const todoDate = new Date(curr.date);

      return !curr.completed
        ? todoDate < Date.now()
          ? (acc.expiredQty++, acc.actualQty++, acc)
          : todoDate <= today
          ? (acc.actualQty++, acc)
          : acc
        : acc;
    },
    { actualQty: 0, expiredQty: 0 }
  );

  // Сделать возврат значений и Вынести этот рендер из функции???
  document.querySelectorAll('.actual').forEach((el) => (el.textContent = actualQty));
  document.querySelectorAll('.expired').forEach((el) => (el.textContent = expiredQty));
};

// Удаление задачи
const deleteTodo = (id) => {
  // todos = todos.filter((todo) => todo.id !== id);
  const { remaining, removed } = todos.reduce(
    (acc, todo) =>
      todo.id === id
        ? { remaining: acc.remaining, removed: todo }
        : (acc.remaining.push(todo), acc),
    { remaining: [], removed: null }
  );

  todos = remaining;
  setData(todosKey, todos);
  schedulePlannedUpdate(); // вынести из функции!!!

  // Ставим у удаленного элемента deleted = true
  removed.deleted = true;
  // Вставляем удаленный элемент в начало массива корзины чтобы в истории удаления сначала были новые
  trash.unshift(removed);

  setData(trashKey, trash);
};

// Восстановление удаленной задачи из корзины
const restoreTodo = (id) => {
  const { remaining, restored } = trash.reduce(
    (acc, todo) =>
      todo.id === id
        ? { remaining: acc.remaining, restored: todo }
        : (acc.remaining.push(todo), acc),
    { remaining: [], restored: null }
  );

  trash = remaining;
  setData(trashKey, trash);

  const resoredTodo = {
    id: restored.id,
    title: restored.title,
    completed: restored.completed,
    date: restored.date,
    createdAt: restored.createdAt,
  };

  todos.push(resoredTodo);
  setData(todosKey, todos);
  schedulePlannedUpdate(); // вынести из функции!!!
};

// Применяем фильтры
const applyFilters = () => {
  const filter = document.querySelector('input[name="filter"]:checked')?.id || 'actual';
  const searchStr = todosSearchEl.value.trim().toLowerCase();

  let filteredTodos = filterByStatus(todos, filter);
  filteredTodos = filterByString(filteredTodos, searchStr);
  // Не сортируем корзину а выводим ее массив в порядке удаления
  filteredTodos = filter !== 'deleted' ? sortTodos(filteredTodos) : filteredTodos;

  return { filteredTodos, filter, searchStr };
};

/* ===== Планирование статусов задач ===== */

// Вычисление текущего статуса задачи
function computePlannedStatus(todo, now = Date.now()) {
  const due = todo.date;

  if (due <= now) return 'expired';

  const diff = due - now;

  // Интервалы
  const CURRENT = 3600_000;
  const SOON = 7200_000;

  const today = new Date(now);
  const dueDate = new Date(due);

  const isSameDay =
    dueDate.getFullYear() === today.getFullYear() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getDate() === today.getDate();

  const isTomorrow = (() => {
    const t = new Date(today);
    t.setDate(t.getDate() + 1);
    return (
      dueDate.getFullYear() === t.getFullYear() &&
      dueDate.getMonth() === t.getMonth() &&
      dueDate.getDate() === t.getDate()
    );
  })();

  if (diff < CURRENT) return 'current';
  if (diff < SOON) return 'soon';
  if (isSameDay) return 'today';
  if (isTomorrow) return 'tomorrow';
  return 'later';
}

// Обновление статусов всех задач и сохранение
function updatePlannedStatuses() {
  const now = Date.now();

  todos.forEach((todo) => {
    todo.planned = computePlannedStatus(todo, now);
  });

  setData(todosKey, todos);
}

// Получение ближайшего (из всех задач) момента изменения статуса
function getNextChangeTimestamp(todo, now = Date.now()) {
  const due = todo.date;
  if (due <= now) return null;

  const CURRENT = 3600_000;
  const SOON = 7200_000;

  const dueDate = new Date(due);
  const today = new Date(now);

  const midnightNext = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
    0,
    0,
    0,
    0
  ).getTime();

  const timestamps = [];

  // Порог 3h (today -> soon)
  const soonTS = due - SOON;
  if (soonTS > now) timestamps.push(soonTS);

  // Порог 1h (soon -> current)
  const currentTS = due - CURRENT;
  if (currentTS > now) timestamps.push(currentTS);

  // Дедлайн (current -> expired)
  timestamps.push(due);

  // Переход на следующий день (later -> tomorrow или tomorrow -> today)
  if (midnightNext > now) timestamps.push(midnightNext);

  const future = timestamps.filter((ts) => ts > now);
  return future.length ? Math.min(...future) : null;
}

// Поиск ближайшего времени изменения (временной метки) среди всех задач
function getClosestChange(list) {
  const now = Date.now();
  let closest = null;

  for (const todo of list) {
    const timestamp = getNextChangeTimestamp(todo, now);
    if (timestamp == null) continue;
    if (closest == null || timestamp < closest) closest = timestamp;
  }

  return closest;
}

let plannedTimer = null;

// Планирование обновления статусов и рендера
function schedulePlannedUpdate() {
  if (plannedTimer) {
    clearTimeout(plannedTimer);
    plannedTimer = null;
  }

  updatePlannedStatuses();
  renderTodos();

  const closest = getClosestChange(todos);
  if (!closest) return;

  let delay = closest - Date.now();
  const LIMIT = 2_147_483_647;
  if (delay > LIMIT) delay = LIMIT;

  if (delay <= 0) return schedulePlannedUpdate();

  plannedTimer = setTimeout(() => {
    plannedTimer = null;
    schedulePlannedUpdate();
  }, delay);
}

/* ===== Резервное обновление для фоновых вкладок ===== */
let hiddenFallbackInterval = null;

function startHiddenFallback() {
  if (hiddenFallbackInterval) return;
  hiddenFallbackInterval = setInterval(() => {
    updatePlannedStatuses();
    renderTodos();
    schedulePlannedUpdate();
  }, 60000); // каждые 60 секунд
}

function stopHiddenFallback() {
  if (!hiddenFallbackInterval) return;
  clearInterval(hiddenFallbackInterval);
  hiddenFallbackInterval = null;
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    startHiddenFallback();
  } else {
    stopHiddenFallback();
    schedulePlannedUpdate();
  }
});

window.addEventListener('focus', () => {
  schedulePlannedUpdate();
});

// Создание HTML элемента задачи
const createTodoElement = (todo) => {
  const divTodoEl = document.createElement('div');
  divTodoEl.className = 'todo';
  divTodoEl.dataset.id = todo.id;

  const labelEl = document.createElement('label');

  const checkboxInputEl = document.createElement('input');
  checkboxInputEl.type = 'checkbox';
  checkboxInputEl.checked = todo.completed;

  const spanCheckboxEl = document.createElement('span');
  spanCheckboxEl.className = 'checkbox';

  const divTodoContentEl = document.createElement('div');
  divTodoContentEl.className = 'todo-content';

  const divPlannedEl = document.createElement('div');
  divPlannedEl.className = 'planned';

  const spanPlannedEl = document.createElement('span');
  spanPlannedEl.className = `badge badge-${todo.planned}`;
  spanPlannedEl.textContent =
    todo.planned === 'current'
      ? 'Сейчас'
      : todo.planned === 'soon'
      ? 'Скоро'
      : todo.planned === 'today'
      ? 'Сегодня'
      : todo.planned === 'tomorrow'
      ? 'Завтра'
      : todo.planned === 'later'
      ? 'Позже'
      : 'Просрочено';

  const spanTodoDatetimeEl = document.createElement('span');
  spanTodoDatetimeEl.className = 'todo-datetime text-sm text-lite';
  spanTodoDatetimeEl.textContent = new Date(todo.date).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  const spanTodoTitleEl = document.createElement('span');
  spanTodoTitleEl.className = 'todo-title';
  spanTodoTitleEl.textContent = todo.title;

  if (todo.deleted) {
    spanCheckboxEl.classList.add('inactive'); // делаем chrckbox смены состояния неактивным для удаленной задачи

    const buttonRestoreBtnEl = document.createElement('button');
    buttonRestoreBtnEl.type = 'button';
    buttonRestoreBtnEl.className = 'restore-btn btn btn-ghost';
    buttonRestoreBtnEl.innerHTML = `<span class="text-2xl material-symbols-outlined">restore_from_trash</span>`;

    divPlannedEl.append(spanTodoDatetimeEl);
    labelEl.append(checkboxInputEl, spanCheckboxEl);
    divTodoContentEl.append(divPlannedEl, spanTodoTitleEl);
    divTodoEl.append(labelEl, divTodoContentEl, buttonRestoreBtnEl);
  } else {
    const buttonEditBtnEl = document.createElement('button');
    buttonEditBtnEl.type = 'button';
    buttonEditBtnEl.className = 'edit-btn btn btn-ghost';
    buttonEditBtnEl.innerHTML = `<span class="text-2xl material-symbols-outlined">edit</span>`;

    const buttonDeleteBtnEl = document.createElement('button');
    buttonDeleteBtnEl.type = 'button';
    buttonDeleteBtnEl.className = 'delete-btn btn btn-ghost';
    buttonDeleteBtnEl.innerHTML = `<span class="text-2xl material-symbols-outlined">delete</span>`;

    if (!todo.completed) divPlannedEl.append(spanPlannedEl, spanTodoDatetimeEl);
    else divPlannedEl.append(spanTodoDatetimeEl);

    labelEl.append(checkboxInputEl, spanCheckboxEl);
    divTodoContentEl.append(divPlannedEl, spanTodoTitleEl);
    divTodoEl.append(labelEl, divTodoContentEl, buttonEditBtnEl, buttonDeleteBtnEl);
  }

  return divTodoEl;
};

// Рендер (добавление в слой div #todos-list) элемент созданный для каждой задачи
const renderTodos = () => {
  const { filteredTodos, filter, searchStr } = applyFilters();
  const todosQty = filteredTodos.length;
  const wordFind = pluralize(todosQty, 'Найдена', 'Найдены', 'Найдено');
  const wordTask = pluralize(todosQty, 'задача', 'задачи', 'задач');
  const wordFilter =
    filter === 'all'
      ? '' // можно без 'all', оставлено для ясности
      : filter === 'active'
      ? pluralize(filteredTodos.length, 'активная', 'активные', 'активных')
      : filter === 'done'
      ? pluralize(filteredTodos.length, 'завершенная', 'завершенные', 'завершенных')
      : filter === 'actual'
      ? pluralize(filteredTodos.length, 'актуальная', 'актуальные', 'актуальных')
      : filter === 'deleted'
      ? pluralize(filteredTodos.length, 'удаленная', 'удаленные', 'удаленных')
      : '';

  const searchStrText = searchStr ? `со строкой '${searchStr}'` : '';

  // Очищаем все в div #todos-list (все отрендеренные ранее задачи) и пишем туда html со строкой:
  // "Найдено n [тип] задач"
  todosListEl.innerHTML = `<span class="text-sm">${wordFind} <span class="font-semibold text-accent">${todosQty} ${wordFilter} ${wordTask}</span> ${searchStrText}</span>`;

  // Добавляем после строки выше в цикле элемент html который создаем createTodoElement
  // для каждой задачи (слой div .todo и всем содержимым)
  filteredTodos.forEach((todo) => todosListEl.appendChild(createTodoElement(todo)));
};

/* ===== События ===== */

// Обработчик события выбора статуса выполнения
todosFilterEls.forEach((filter) => filter.addEventListener('change', renderTodos));

// Обработчик события ввода в строку поиска
todosSearchEl.addEventListener('input', renderTodos);

// Обработчики событий кнопок очистки введенной строки на всех input (text)
cleanInputBtnEls.forEach((button) =>
  button.addEventListener('click', (event) => {
    event.currentTarget.parentElement.querySelector('input').value = '';
    renderTodos();
  })
);

// Обработчик события нажатия кнопки открытия диалога добавления задачи
addTodoBtnEl.addEventListener('click', () => {
  currentEditingId = null;

  const now = new Date();

  document.querySelector('#new-todo-title').value = '';
  document.querySelector('#new-todo-date').value = now.toLocaleDateString('sv-SE');
  document.querySelector('#new-todo-time').value = now.toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  todoDialogActionBtnEl.value = 'Добавить';

  document.body.classList.toggle('no-scroll');
  todoDialogEl.classList.toggle('invisible');
});

// Обработчик события нажатия кнопки действия с задачей (кнопка "Добавить"/"Изменить")
todoDialogActionBtnEl.addEventListener('click', (event) => {
  event.preventDefault();

  const title = document.querySelector('#new-todo-title').value.trim();
  const date = document.querySelector('#new-todo-date').value;
  const time = document.querySelector('#new-todo-time').value;

  if (!title) return;

  const datetime = new Date(`${date}T${time || '00:00'}`);

  if (currentEditingId) {
    editTodo(currentEditingId, title, datetime);
    currentEditingId = null;
    // todoDialogActionBtnEl.value = "Добавить"; // Протестировать!!!
  } else {
    addTodo(title, datetime);
  }

  document.body.classList.toggle('no-scroll');
  todoDialogEl.classList.toggle('invisible');

  countActualTodos(); // при добавлении/изменении todo пересчитываем активные
  renderTodos();
});

// Обработчик события нажатия кнопки действия с задачей (кнопка "Отменить")
cancelBtnEl.addEventListener('click', () => {
  currentEditingId = null;

  document.body.classList.toggle('no-scroll');
  todoDialogEl.classList.toggle('invisible');

  // todoDialogActionBtnEl.value = "Добавить"; // Протестировать!!!
});

// Обработка кликов по разным элементам в списке todo (один обработчик на весь список)
todosListEl.addEventListener('click', (event) => {
  const todoEl = event.target.closest('.todo');
  if (!todoEl) return;

  const id = todoEl.dataset.id;

  // Клик по checkbox для переключения Active/Done
  if (event.target.closest('input[type="checkbox"]')) {
    toggleTodo(id);
    countActualTodos(); // при смене состояния todo пересчитываем активные
    renderTodos();
    return;
  }

  // Клик по кнопке редактирования todo
  if (event.target.closest('.edit-btn')) {
    const todo = findTodo(id);
    if (!todo) return;

    currentEditingId = id;

    document.querySelector('#new-todo-title').value = todo.title;
    todoDialogActionBtnEl.value = 'Изменить';

    const date = new Date(todo.date);

    // Устанавливаем дату в формате YYYY-MM-DD для input[type="date"]
    document.querySelector('#new-todo-date').value = date.toLocaleDateString('sv-SE');

    // Устанавливаем время в формате HH:MM для input[type="time"]
    document.querySelector('#new-todo-time').value = date.toLocaleTimeString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
    });

    document.body.classList.toggle('no-scroll');
    todoDialogEl.classList.toggle('invisible');
    return;
  }

  // Клик по кнопке удаления todo
  if (event.target.closest('.delete-btn')) {
    deleteTodo(id);
    renderTodos();
  }

  // Клик по кнопке восстановления удаленного todo
  if (event.target.closest('.restore-btn')) {
    restoreTodo(id);
    renderTodos();
  }
});

// Первоначальная инициализация (переделать на чистые функции???)
countActualTodos();
renderTodos();
schedulePlannedUpdate();
