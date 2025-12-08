/* course-html-css-js/lessons/57-1-lesson-36-1/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 57.1 Lesson 36.1

class User {
  static staticMethod() {
    console.log('Static method of class User');
  }

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  login() {
    console.log('Login...');
  }

  register() {
    console.log('Register...');
  }
}

const user = new User('Artem', 44);
console.log(user);

User.staticMethod();

class Article {
  static compareDate(article1, article2) {
    console.log(article1.date === article2.date);
  }

  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
}

const article1 = new Article('HTML', '2025-2-2');
const article2 = new Article('CSS', '2025-3-2');

Article.compareDate(article1, article2);

/* 1. Создайте класс Calculator, у которого будет статический метод add(a, b), который будет 
принимать два числа и возвращать их сумму. */
class Calculator {
  static add(a, b) {
    return a + b;
  }
}

/* 2. Создайте класс RandomNumberGenerator, у которого будет статический метод generate(min, max), 
который будет генерировать случайное число в заданном диапазоне. */
class RandomNumberGenerator {
  static generate(min, max) {
    return Math.random() * (max - min) + min;
  }
}

/* 3. Создайте класс MathUtils (Математический утилитар), у которого будет статический метод 
getMax(), который будет принимать массив чисел и возвращать наибольшее число. */
class MathUtils {
  static getMax(arr) {
    return Math.max(...arr);
  }
}

class Counter {
  static count = 0;

  static increment() {
    Counter.count++;
  }
  static decrement() {
    Counter.count--;
  }
}

/* ===== END ===== */

const resourceUrl = `./scripts/script.js`;

fetchAsText(resourceUrl).then(async (results) => {
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
