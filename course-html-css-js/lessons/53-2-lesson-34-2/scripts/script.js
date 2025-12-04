/* course-html-css-js/lessons/53-1-lesson-34-1/styles/styles.css */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Lesson 34.2
// Функция-конструктор. this создаётся автоматически через new.
function User(name, age) {
  this.name = name;
  this.age = age;
  this.isAdmin = false;
}

const userArtem = new User('Arem', 44); // создаёт объект с прототипом User.prototype
console.log(userArtem);

// В конструкторе можно определять методы прямо на экземпляре.
// Каждый экземпляр будет иметь собственную копию print.
function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
  this.print = function () {
    console.log(`Brand: ${this.brand}, Model: ${this.model}, Year: ${this.year}`);
  };
}

const carHonda = new Car('Honda', 'CRV-5', 2020);
carHonda.print();

// Фабрика, возвращающая набор функций.
// Каждый вызов создаёт новый объект с новыми функциями.
function showInfoFunctions() {
  function showName() {
    console.log(this.name);
  }

  function showAge() {
    console.log(this.age);
  }

  return { showName, showAge };
}

const user1 = {
  name: 'Artem',
  age: 44,
  showName() {
    console.log(this.name); // метод, контекст берётся из объекта
  },
};

user1.showName();

const user2 = {
  name: 'Alice',
  age: 25,
};

// call: передача this напрямую
showInfoFunctions().showName.call(user2);
showInfoFunctions().showAge.call(user2);

// apply: то же самое, но аргументы через массив
showInfoFunctions().showName.apply(user2);
showInfoFunctions().showAge.apply(user2);

// bind: создаёт новую функцию с фиксированным this
const user2ShowName = showInfoFunctions().showName.bind(user2);
const user2ShowAge = showInfoFunctions().showAge.bind(user2);

user2ShowName();
user2ShowAge();

// 1. Сложение через call: аргументы по списку
{
  function sum(num1, num2) {
    this.result = num1 + num2;
  }

  const calc = { result: 0 };

  sum.call(calc, 40, 20); // this = calc
  console.log(calc.result);
}

// 2. Деление через apply: аргументы массивом
{
  function div(num1, num2) {
    this.result = num1 / num2;
  }

  const calc = { result: 0 };

  div.apply(calc, [40, 20]);
  console.log(calc.result);
}

// 3. bind: функция с фиксированным this
function addOne() {
  this.value += 1;
}

const counter = { value: 0 };

const counterAddOne = addOne.bind(counter);

counterAddOne();
counterAddOne();
counterAddOne();
counterAddOne();
counterAddOne();

console.log(counter.value); // 5
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
