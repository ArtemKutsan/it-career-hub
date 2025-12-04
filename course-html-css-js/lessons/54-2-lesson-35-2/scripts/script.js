/* course-html-css-js/lessons/54-1-lesson-35-1/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 54.2 Lesson 35.2

// Задача 1.
// ● Создайте класс Circle, который принимает радиус при создании.
// ● У класса должен быть метод getArea(), который возвращает площадь круга.
// ● У класса также должен быть метод getCircumference(), который возвращает длину окружности круга.
// ● Создайте экземпляр класса и выведите результаты вызова методов.
{
  class Circle {
    constructor(radius) {
      this.radius = radius;
    }

    getArea() {
      return Math.PI * this.radius ** 2;
    }

    getCircumference() {
      return 2 * Math.PI * this.radius;
    }
  }

  const circle = new Circle(5);
  console.log('Площадь круга:', circle.getArea().toFixed(2));
  console.log('Длина окружности:', circle.getCircumference().toFixed(2));
}

// Задача 2.
// ● Создайте класс Rectangle, который принимает ширину и высоту при создании.
// ● У класса должен быть метод getArea(), который возвращает площадь прямоугольника.
// ● У класса также должен быть метод getPerimeter(), который возвращает периметр прямоугольника.
// ● Создайте экземпляр класса и выведите результаты вызова методов.
{
  class Rectangle {
    constructor(width, height) {
      this.width = width;
      this.height = height;
    }

    getArea() {
      return this.width * this.height;
    }

    getPerimeter() {
      return 2 * (this.width + this.height);
    }
  }

  const rectangle = new Rectangle(4, 6);
  console.log('Площадь прямоугольника:', rectangle.getArea());
  console.log('Периметр прямоугольника:', rectangle.getPerimeter());
}

// Задача 3.
// ● Создайте класс Shape, у которого есть метод calculateArea().
// ● Создайте два наследника класса Shape: Rectangle и Circle.
// ● У каждого наследника должен быть свой метод calculateArea(), который переопределяет метод родительского класса.
// ● Создайте экземпляры классов Rectangle и Circle и вызовите их методы calculateArea().
{
  class Shape {
    calculateArea() {
      throw new Error('Метод calculateArea() должен быть переопределен в наследнике');
    }
  }

  class Rectangle extends Shape {
    constructor(width, height) {
      super();
      this.width = width;
      this.height = height;
    }

    calculateArea() {
      return this.width * this.height;
    }
  }

  class Circle extends Shape {
    constructor(radius) {
      super();
      this.radius = radius;
    }

    calculateArea() {
      return Math.PI * this.radius ** 2;
    }
  }

  const rect = new Rectangle(4, 6);
  const circ = new Circle(5);
  console.log('Площадь прямоугольника:', rect.calculateArea());
  console.log('Площадь круга:', circ.calculateArea().toFixed(2));
}

// Задача 4.
// ● Создайте класс Transport, у которого есть метод move().
// ● Создайте два наследника класса Transport: Car и Bicycle.
// ● У каждого наследника должен быть свой метод move(), который переопределяет метод родительского класса.
// ● Создайте экземпляры классов Car и Bicycle и вызовите их методы move().
{
  class Transport {
    move() {
      throw new Error('Метод move() должен быть переопределен в подклассе');
    }
  }

  class Car extends Transport {
    move() {
      console.log('Автомобиль едет с помощью двигателя');
    }
  }

  class Bicycle extends Transport {
    move() {
      console.log('Велосипед движется с помощью человека');
    }
  }

  const car = new Car();
  const bicycle = new Bicycle();
  car.move();
  bicycle.move();
}

// Задача 5.
// ● Создайте класс Person, который имеет свойство name.
// ● Используйте геттер и сеттер для доступа к свойству name.
// ● При попытке установить пустое имя сеттер должен вывести сообщение об ошибке.
// ● Создайте экземпляр класса, установите имя и выведите имя с помощью геттера.
{
  class Person {
    #name;

    constructor(name) {
      this.#name = name;
    }

    get name() {
      return this.#name;
    }

    set name(value) {
      if (value === '' || value == null) {
        console.error('Ошибка: Имя не может быть пустым');
        return;
      }
      this.#name = value;
    }
  }

  const person = new Person('Artem');
  console.log('Имя:', person.name);

  person.name = 'Max';
  console.log('Новое имя:', person.name);

  person.name = '';
  console.log('Имя после попытки изменить на недопустимое:', person.name);
}

// Задача 6.
// ● Создайте класс Car, у которого есть приватное свойство mileage.
// ● Используйте геттер и сеттер для доступа к свойству mileage.
// ● При попытке установить отрицательное значение сеттер должен вывести сообщение об ошибке.
// ● Создайте экземпляр класса, установите пробег и выведите его с помощью геттера.
{
  class Car {
    #mileage;

    constructor(mileage) {
      this.#mileage = mileage;
    }

    get mileage() {
      return this.#mileage;
    }

    set mileage(value) {
      if (value < 0) {
        console.error('Ошибка: Пробег не может быть отрицательным');
        return;
      }
      this.#mileage = value;
    }
  }

  const car = new Car(10000);
  console.log('Пробег:', car.mileage);

  car.mileage = 15000;
  console.log('Новый пробег:', car.mileage);

  car.mileage = -500;
  console.log('Пробег после попытки изменить на недопустимый:', car.mileage);
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
