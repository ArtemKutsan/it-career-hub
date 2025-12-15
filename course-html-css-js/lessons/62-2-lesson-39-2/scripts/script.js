/* course-html-css-js/lessons/62-2-lesson-39-2/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 62.2 Lesson 39.2
const BASE_URL = 'https://dummyjson.com';
const usersUrl = `${BASE_URL}/users`;
const userUrl = `${BASE_URL}/user`;

const USERNAME_RE = /^[A-Za-z]{2,}$/;
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_RE = /^.{6,}$/;

const openModalBtn = document.querySelector('#open-modal');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const modernForm = document.getElementById('modern-form');
const registerBtn = document.getElementById('switch-to-register');
const loginBtn = document.getElementById('switch-to-login');
const signUpForm = document.getElementById('sign-up');
const signInForm = document.getElementById('sign-in');
const closeModalBtn = document.querySelector('#close-modal');

// Функция открытия модалки
const openModal = () => {
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

// Функция закрытия модалки
const closeModal = () => {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
};

// Функция входа
const loginUser = async (userData) => {
  try {
    const response = await fetch(`${userUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data?.message || 'Ошибка входа');

    return data;
  } catch (error) {
    throw error;
  }
};

// Функция добавления (регистрации) пользователя
const addUser = async (userData) => {
  try {
    const response = await fetch(`${usersUrl}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data?.message || 'Ошибка регистрации');

    return data;
  } catch (error) {
    throw error;
  }
};

/* =============================== */
/* ===== Обработчики событий ===== */
/* =============================== */
// Переключатель формы
registerBtn.addEventListener('click', () => {
  modernForm.classList.add('switched');
});

// Переключатель формы
loginBtn.addEventListener('click', () => {
  modernForm.classList.remove('switched');
});

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

modalBody.addEventListener('click', (event) => {
  event.stopPropagation();
});

signInForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  let { username, password } = event.target.elements;

  username = username.value.trim();
  password = password.value.trim();

  // Email
  // Username
  if (!USERNAME_RE.test(username)) {
    alert('Username: минимум 2 латинские буквы');
    return;
  }

  // Password length
  if (!PASSWORD_RE.test(password)) {
    alert('Пароль минимум 6 символов');
    return;
  }

  const userData = { username, password };

  try {
    const loginResult = await loginUser(userData);

    alert('Успешный вход');
    console.log('DummyJSON response:', loginResult);

    signInForm.reset();
    modal.classList.add('hidden');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  let { username, email, password, confirmPassword } = event.target.elements;

  username = username.value.trim();
  email = email.value.trim();
  password = password.value.trim();
  confirmPassword = confirmPassword.value.trim();

  // Username
  if (!USERNAME_RE.test(username)) {
    alert('Username: минимум 2 латинские буквы');
    return;
  }

  // Email
  if (!EMAIL_RE.test(email)) {
    alert('Некорректный email');
    return;
  }

  // Password length
  if (!PASSWORD_RE.test(password)) {
    alert('Пароль минимум 6 символов');
    return;
  }

  // password === confirmPassword
  if (password !== confirmPassword) {
    alert('Пароли не совпадают');
    return;
  }

  const userData = { username, email, password };

  try {
    const newUser = await addUser(userData);

    alert('Регистрация успешна');
    console.log('DummyJSON response:', newUser);

    signUpForm.reset();
    modal.classList.add('hidden');
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

// # Вы разрабатываете часть веб-приложения, где пользователи могут зарегистрироваться. Для имитации работы с реальным бэкендом используйте тестовое API DummyJSON.

// 1. Модальное окно:
//    Кнопка "Зарегистрироваться" в основном интерфейсе для открытия модального окна +
//    Модальное окно появляется поверх всего контента с полупрозрачным затемнением фона +
//    Несколько способов закрытия:
//    Кнопка "×" в углу окна +
//    Клик вне области модального окна +
//    Клавиша Esc +
//    Кнопка "Отмена" в форме -

// 2. Форма регистрации:
//    Поля (в соответствии с DummyJSON API):
//    Имя пользователя (username) *обязательное +
//    Email *обязательное +
//    Пароль (password) *обязательное, минимум 6 символов +
//    Имя (firstName) *обязательное -
//    Фамилия (lastName) *обязательное -
//    Возраст (age) *обязательное, число от 18 до 100 -

//    Чекбокс "Я согласен с условиями использования" ?
//    Поле подтверждения пароля (на фронтенде) +

// 3. Валидация:
//    Клиентская валидация:
//    Все обязательные поля заполнены +
//    Email соответствует формату +
//    Пароль ≥ 6 символов +
//    Пароль и подтверждение совпадают +
//    Возраст в допустимом диапазоне -
//    Чекбокс согласия отмечен ?

//    Серверная валидация: через ответ API
//    Обработка ошибок (например, username уже занят)

// 4. Интеграция с DummyJSON API:
//    Endpoint: POST https://dummyjson.com/users/add
//    Отправка данных: при успешной клиентской валидации
//    Обработка ответов:
//    Успех (200-299): показать сообщение об успешной регистрации, закрыть модальное окно через 2 секунды
//    Ошибка (400-499): показать сообщение об ошибке под соответствующим полем
//    Сетевая ошибка: общее сообщение об ошибке соединения

// 5. UI/UX требования:
//    Индикатор загрузки: при отправке формы показывать спиннер/индикатор

//    Состояния кнопки отправки:
//    Неактивна, пока форма не валидна
//    Текст меняется на "Отправка..." при отправке

//    Отображение ошибок:
//    Под каждым полем в реальном времени
//    Красная рамка у невалидных полей
//    Общие ошибки API над формой

//    Успешная регистрация:
//    Показать зеленое уведомление
//    Вывести полученные данные пользователя в консоль (для проверки) +
//    Автоматическое закрытие окна

// 6. Дополнительная функциональность (опционально):
//    Модальное окно входа: используя POST https://dummyjson.com/auth/login +
//    Переключение между регистрацией и входом в одном модальном окне +
//    Сохранение токена при успешном входе в localStorage

// Успешная регистрация:
// username: "john_doe"
// email: "john@example.com"
// password: "password123"
// firstName: "John"
// lastName: "Doe"
// age: 25

// Ошибка (для тестирования):
// username: "" (пустое)
// email: "invalid-email"
// password: "123" (короткий)
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
