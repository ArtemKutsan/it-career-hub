// course-html-css-js/homeworks/homework-20/scripts/script.js

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 20

// Задание 1.
/* Создайте класс Shape, у которого есть метод draw(). Создайте два наследника класса 
Shape: Rectangle и Circle. У каждого наследника должен быть свой метод draw(), который 
переопределяет метод родительского класса. Создайте массив, содержащий экземпляры классов 
Rectangle и Circle. Используйте цикл для вызова метода draw() для каждого элемента массива. */

// Базовый класс
class Shape {
  draw() {
    throw new Error('Метод draw() должен быть переопределён в наследнике');
  }
}

// Наследник: прямоугольник
class Rectangle extends Shape {
  draw() {
    console.log('Рисую прямоугольник');
  }
}

// Наследник: круг
class Circle extends Shape {
  draw() {
    console.log('Рисую круг');
  }
}

// Массив экземпляров разных фигур
const shapes = [new Rectangle(), new Circle(), new Rectangle(), new Circle()];

// Вызов draw() для каждой фигуры
shapes.forEach((shape) => shape.draw());
// for (const shape of shapes) shape.draw();
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

    content = content.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/\r?\n+/g, ''));

    pre.textContent = content;
    const extension = url.split('.').pop();
    pre.classList.add(`language-${extension}`);
    codeBlock.appendChild(pre);
  }
  await highlightPreBlocks(codeBlock);
});
