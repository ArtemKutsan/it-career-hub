const BASE_URL = "https://jsonplaceholder.typicode.com";
const todosUrl = `${BASE_URL}/todos`;
const usersUrl = `${BASE_URL}/users`;
let mergedData = [];

// Делаем заглавной первую букву в строке
const capitalizeFirstLetter = (str) =>
  str ? str[0].toUpperCase() + str.slice(1) : str;

// Объединение данных
const mergeData = (todos, users) =>
  todos.map((todo) => {
    const user = users.find((u) => String(u.id) === String(todo.userId));

    return {
      todoId: todo.id,
      title: todo.title,
      completed: todo.completed,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  });

// Рендер списка todo
const renderTodos = (data, userId = "all") => {
  const todosListEl = document.querySelector("#todos-list");
  todosListEl.innerHTML = "";

  if (userId === "all") {
    data.forEach((todo) => {
      const todoCardDiv = document.createElement("div");

      todoCardDiv.className =
        "todo-card" + (todo.completed ? " completed" : "");

      todoCardDiv.innerHTML = `
        <span class="text-sm text-lite">${todo.user.name}</span>
        <span class="todo-title flex-1">${capitalizeFirstLetter(
          todo.title
        )}</span>
        <a href="mailto:${todo.user.email.toLowerCase()}" class="link text-xs">${todo.user.email.toLowerCase()}</a>
      `;

      todosListEl.appendChild(todoCardDiv);
    });
  } else {
    data.forEach((todo) => {
      const todoCardDiv = document.createElement("div");

      todoCardDiv.className =
        "todo-card" + (todo.completed ? " completed" : "");
      todoCardDiv.innerHTML = `<span class="todo-title">${capitalizeFirstLetter(
        todo.title
      )}</span>`;

      todosListEl.appendChild(todoCardDiv);
    });
  }
};

// Статистика
const calculateStatistics = (data, userInfo = null) => {
  const total = data.length;
  const completed = data.filter((todo) => todo.completed).length;
  const percent = total ? ((completed / total) * 100).toFixed(1) : 0;
  const remaining = total - completed;

  let statsHTML = `
    <span>Всего задач: ${total},</span>
    <span>Выполнено: ${completed} (${percent}%),</span>
    <span>Осталось: ${remaining}</span>
  `;

  if (userInfo) {
    statsHTML =
      `
      <span>Пользователь: ${userInfo.name}</span>
      (<a href="mailto:${userInfo.email.toLowerCase()}" class="link">${userInfo.email.toLowerCase()}</a>),
    ` + statsHTML;
  }

  document.querySelector("#stats").innerHTML = statsHTML;
};

// Фильтр по пользователю и получение информации о нём
const filterByUser = (data, userId) => {
  let userInfo = null;

  if (userId !== "all") {
    data = data.filter((todo) => String(todo.user.id) === String(userId));
    const sample = data[0];
    if (sample) userInfo = { name: sample.user.name, email: sample.user.email };
  }

  // Расчёт статистики сразу после фильтра по пользователю
  calculateStatistics(data, userInfo);

  return data;
};

// Фильтр по состоянию задачи: active/done
const filterByStatus = (data, filter) =>
  filter === "active"
    ? data.filter((todo) => !todo.completed)
    : filter === "done"
    ? data.filter((todo) => todo.completed)
    : data;

// Фильтр по поисковой строке
const filterBySearch = (data, searchStr) =>
  searchStr
    ? data.filter((todo) => todo.title.toLowerCase().includes(searchStr))
    : data;

// Сортировка задач по выполнению
const sortTodos = (data) => data.sort((a, b) => a.completed - b.completed);

// Общая функция применения фильтров
const applyFilters = () => {
  // Считываем значение из select для фильтра по пользователю
  const userId = document.querySelector("#user-select").value;

  // Считываем значение из input (radio) для фильтра по статусу выполнения
  const filter =
    document.querySelector('input[name="filter"]:checked')?.id.toLowerCase() ||
    "all";

  // Считываем значение строки поиска для фильта по подстроке в названии todo
  const searchStr = document
    .querySelector("#todos-search")
    .value.trim()
    .toLowerCase();

  // Применяем все фильтры
  let data = mergedData;

  data = filterByUser(data, userId);
  data = filterByStatus(data, filter);
  data = filterBySearch(data, searchStr);
  data = sortTodos(data);

  // Рендерим отфильтрованные данные
  renderTodos(data, userId);
};

// Универсальный загрузчик данных
const loadData = async (url) => {
  let data = [];

  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.error("Error loading data:", error);
  }

  return data;
};

// Инициализация
Promise.all([loadData(todosUrl), loadData(usersUrl)]).then(([todos, users]) => {
  mergedData = mergeData(todos, users);

  // Заполнение select списком полченных пользователей
  const userSelectEl = document.querySelector("#user-select");

  userSelectEl.innerHTML =
    `<option value="all">All users</option>` +
    users
      .map((user) => `<option value="${user.id}">${user.name}</option>`)
      .join("");

  /* ===== События ===== */
  // Обработчик события ввода в строку поиска input (text) #todos-search
  document
    .querySelector("#todos-search")
    .addEventListener("input", applyFilters);

  // Обработчик события выбора статуса выполнения input (radio) name="filter"
  document
    .querySelectorAll('input[name="filter"]')
    .forEach((radio) => radio.addEventListener("change", applyFilters));

  // Обработчик события на выбор пользователя select #user-select
  document
    .querySelector("#user-select")
    .addEventListener("change", applyFilters);

  // Обработчики событий кнопок очистки введенной строки на всех input (text)
  document.querySelectorAll(".clean-input-btn").forEach((button) =>
    button.addEventListener("click", (event) => {
      event.currentTarget.parentElement.querySelector("input").value = "";

      applyFilters();
    })
  );

  // При первом запусе отображаем статистику и рендерим данные
  calculateStatistics(mergedData);
  renderTodos(sortTodos(mergedData));
});
