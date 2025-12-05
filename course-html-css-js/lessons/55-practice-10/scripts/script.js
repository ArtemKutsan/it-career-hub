/* course-html-css-js/lessons/55-practice-10/scripts/scripts.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 55 Practice 10

// Задача 1
/* Создайте базовый класс Animal, который имеет два свойства: name (имя животного) и type (тип 
животного). Затем создайте класс Dog, который наследуется от класса Animal. Класс Dog должен иметь 
дополнительное свойство breed (порода собаки). При создании экземпляра класса Dog, вызовите 
конструктор родительского класса Animal, передав в него имя и тип собаки. Используйте ключевое 
слово super для доступа к методам и свойствам родительского класса. */

class Animal {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'собака');
    this.breed = breed;
  }
}

const dog = new Dog('Рекс', 'Лабрадор');
console.log(dog.name, dog.breed);

// Задача 2.
/* Создайте базовый класс User, у которого есть свойства name и age. Добавьте метод displayInfo(), 
который выводит в консоль информацию о пользователе. Создайте наследника класса User под 
названием Admin, который будет представлять пользователя с административными правами. Добавьте в 
класс Admin дополнительное свойство role и метод displayRole(), который выводит в консоль роль 
администратора. */

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get isAdmin() {
    return this instanceof Admin; // true только для объектов класса Admin
  }

  displayInfo() {
    console.log(`Имя: ${this.name}, Возраст: ${this.age}`);
  }
}

class Admin extends User {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  displayRole() {
    console.log(`Роль: ${this.role}`);
  }
}

const max = new User('Max', 45);
max.displayInfo();
console.log('Принадлежность к группе администраторов:', max.isAdmin);

const artem = new Admin('Artem', 44, 'Системный администратор');
artem.displayInfo();
console.log('Принадлежность к группе администраторов:', artem.isAdmin);
artem.displayRole();

// Задача 3.
/* Создайте базовый класс Account, представляющий банковский счет, у которого есть свойства id, 
balance и методы deposit() и withdraw(), для пополнения и снятия средств со счета соответственно. 
Создайте наследника класса Account под названием SavingsAccount, который представляет собой 
сберегательный счет. Добавьте в класс SavingsAccount дополнительное свойство interestRate, 
представляющее годовую процентную ставку, а также метод addInterest(), который добавляет на счет 
проценты по прошествии определенного времени. */

class Account {
  constructor(id, balance) {
    this.id = id;
    this.balance = balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Счет: ${this.id} пополнен на ${amount}. Новый баланс: ${this.balance}`);
    }
  }

  thdraw(amount) {
    if (amount <= 0) {
      console.log('Сумма должна быть больше нуля');
      return;
    }

    if (amount > this.balance) {
      console.log('Недостаточно средств');
      return;
    }

    this.balance -= amount;

    console.log(`Со счета ${this.id} снято ${amount}. Новый баланс: ${this.balance}`);
  }
}

class SavingsAccount extends Account {
  constructor(id, balance, interestRate) {
    super(id, balance);
    this.interestRate = interestRate;
  }

  addInterest() {
    const interest = this.balance * this.interestRate;
    this.balance += interest;

    console.log(
      `На счет ${this.id} добавлены проценты: ${interest.toFixed(
        2
      )}. Новый баланс: ${this.balance.toFixed(2)}`
    );
  }
}

const client = {
  name: 'Artem',
  account: new Account('ACC001', 0),
  savings: new SavingsAccount('SAV001', 0, 0.05),
};

client.account.deposit(1000);
client.savings.deposit(500);
client.savings.addInterest();
client.account.withdraw(200);

// Задача 4.
/* Создайте базовый класс Library, у которого есть свойство books, представляющее массив объектов 
книг (со свойствами titile и author). Добавьте методы addBook() для добавления книги в библиотеку 
и removeBook() для удаления книги по названию. Создайте наследника класса Library под названием 
DigitalLibrary, который представляет собой цифровую библиотеку с дополнительными методами 
searchByAuthor() и searchByTitle() для поиска книг по автору и названию соответственно. */

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author) {
    this.books.push({ title, author });
    console.log(`Книга "${title}" добавлена`);
  }

  removeBook(title) {
    const initialLength = this.books.length;
    this.books = this.books.filter((book) => book.title !== title);
    if (this.books.length < initialLength) {
      console.log(`Книги с названием "${title}" удалены`);
    } else {
      console.log(`Книги с названием "${title}" не найдены`);
    }
  }

  // removeBook(title) {
  //   // Пример работы метода findIndex
  //   const index = this.books.findIndex((book) => book.title === title);
  //   if (index !== -1) {
  //     this.books.splice(index, 1);
  //     console.log(`Книга "${title}" удалена`);
  //   } else {
  //     console.log(`Книга "${title}" не найдена`);
  //   }
  // }
}

class DigitalLibrary extends Library {
  searchByAuthor(author) {
    return this.books.filter((book) => book.author === author);
  }

  searchByTitle(title) {
    return this.books.filter((book) => book.title === title);
  }
}

const digitalLibrary = new DigitalLibrary();
digitalLibrary.addBook('Атлант расправил плечи', 'Айн Рэнд');
digitalLibrary.addBook('Источник', 'Айн Рэнд');
digitalLibrary.addBook('1984', 'Джордж Орвелл');
digitalLibrary.addBook('Эффект бабочки', 'Рэй Брэдбери');
console.log('Поиск по автору "Айн Рэнд":', digitalLibrary.searchByAuthor('Айн Рэнд'));
console.log('Поиск по названию "1984":', digitalLibrary.searchByTitle('1984'));
digitalLibrary.removeBook('Эффект бабочки');

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
