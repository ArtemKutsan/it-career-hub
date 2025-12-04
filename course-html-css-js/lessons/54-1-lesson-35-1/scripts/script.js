/* course-html-css-js/lessons/53-1-lesson-34-1/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 54.1 Lesson 35.1

// Пример 1.
{
  class User {
    constructor(name, age) {
      this.name = name;
      this.age = age;
      this.vip = false;
      this.isAdmin = false;
    }

    hello() {
      console.log(`Hello, my name is ${this.name}!`);
    }

    getAge() {
      console.log(`My age is ${this.age}`);
    }
  }

  const user1 = new User('Artem', 44);
  const user2 = new User('Mike', 20);
  const user3 = new User('Bob', 34);

  console.log(user1, user2, user3);
}

// Пример 2.
{
  class User {
    constructor(name, age, phone) {
      this.name = name;
      this.age = age;
      this.phone = phone;
    }

    login() {
      console.log(`${this.name} is logining...`);
    }
  }

  class Customer extends User {
    constructor(name, age, phone, card) {
      super(name, age, phone);
      this.card = card;
    }

    pay() {
      console.log(`${this.name} is paying...`);
    }
  }

  class Worker extends User {
    constructor(name, age, phone, car) {
      super(name, age, phone);
      this.car = car;
    }

    bill() {
      console.log(`${this.name} is setting bill...`);
    }
  }

  const customer1 = new Customer('Max', 45, '123456789', 1111222233334444);
  console.log(customer1);
}

{
  class User {
    constructor(name) {
      this.name = name;
    }

    register() {
      console.log(`${this.name} is registering...`);
    }

    login() {
      console.log(`${this.name} is logging in...`);
    }

    hello() {
      console.log(`${this.name} says hello...`);
    }
  }

  class Director extends User {
    constructor(name, room) {
      super(name);
      this.room = room;
    }

    hello() {
      super.hello();
      console.log(`I am the director. My name is ${this.name}.`);
    }

    openSchool() {
      console.log(`${this.name} is opening the school...`);
    }

    hire() {
      console.log(`${this.name} is hiring...`);
    }

    fire() {
      console.log(`${this.name} is firing...`);
    }
  }

  class Teacher extends User {
    constructor(name, classSize) {
      super(name);
      this.classSize = classSize;
    }

    hello() {
      super.hello();
      console.log(`I am a teacher. My name is ${this.name}. Please sit down.`);
    }

    teach() {
      console.log(`${this.name} is teaching...`);
    }
  }

  class Student extends User {
    constructor(name, grade) {
      super(name);
      this.grade = grade;
    }

    hello() {
      super.hello();
      console.log(`I am a student. My name is ${this.name}. I have done my homework.`);
    }

    chooseSubject() {
      console.log(`${this.name} is choosing a subject...`);
    }
  }

  const director = new Director('Artem', 'Room 88');
  director.register();
  director.login();
  director.hello();
  director.openSchool();
  director.hire();
  director.fire();

  const teacher = new Teacher('Max', 25);
  teacher.register();
  teacher.login();
  teacher.hello();
  teacher.teach();

  const student = new Student('Alice', 5);
  student.register();
  student.login();
  student.hello();
  student.chooseSubject();
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
