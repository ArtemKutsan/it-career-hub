/* course-html-css-js/lessons/61-practice-11/scripts/scripts.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 61 Summary 11

// Задание 1
/* Модифицируйте ваш класс Animal. Добавьте статическое свойство totalAnimals, которое будет 
отслеживать общее количество созданных животных. При создании нового экземпляра класса 
(в конструкторе) увеличивайте это значение на 1. Добавьте статический метод getTotal(), который 
возвращает общее количество животных. */
class Animal {
  static totalAnimals = 0;

  constructor(name, type) {
    this.name = name;
    this.type = type;
    Animal.totalAnimals++;
  }
}

const animal1 = new Animal('Jim', 'dog');
const animal2 = new Animal('Barsik', 'cat');

console.log(`Всего животных: ${Animal.totalAnimals}`);

// Задание 2
/* Модифицируйте класс User. Добавьте статическое свойство nextId, которое будет хранить следующий 
доступный ID. При создании нового пользователя автоматически присваивайте ему уникальный ID из 
этого свойства и увеличивайте nextId на 1 для следующего пользователя. Добавьте свойство id в 
экземпляры. */
class User {
  static id = 1;

  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.id = this.constructor.id++;
  }
}

const user1 = new User('Artem', 44);
const user2 = new User('Mike', 20);
const user3 = new User('Bob', 34);

console.log(`Users IDs: ${user1.id}, ${user2.id}, ${user3.id}`);
console.log(`Class User ID: ${User.id}`);

// Задани 3
// К классу Product добавьте статические методы:
// isValidName(name) - проверяет, что имя не пустое и длиннее 2 символов
// isValidPrice(price) - проверяет, что цена положительная
// isValidQuantity(quantity) - проверяет, что количество целое и неотрицательное
// Используйте эти методы в конструкторе класса для проверки входных данных.
class Product {
  static isValidName(name) {
    return typeof name === 'string' && name.trim().length > 2;
  }

  static isValidPrice(price) {
    return typeof price === 'number' && price > 0;
  }

  static isValidQuantity(quantity) {
    return Number.isInteger(quantity) && quantity >= 0;
  }

  constructor(name, price, quantity) {
    if (!Product.isValidName(name))
      throw new Error('Некорректное значение имени продукта. Продукт не создан!');
    if (!Product.isValidPrice(price))
      throw new Error('Некорректное значение цены продукта. Продукт не создан!');
    if (!Product.isValidQuantity(quantity))
      throw new Error('Некорректное значение колличества продукта. Продукт не создан!');

    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
}

const product = new Product('Бананы', 1.99, 100);
// const incorrectProduct = new Product('Яблоки', 0.99, -10);

console.log(product);

// Задание 4
// К классу Account добавьте:
/* Статическое свойство exchangeRates, хранящее курс валют 
(например, {USD: 1, EUR: 0.92, RUB: 92.5}) */
/* Статический метод convert(amount, fromCurrency, toCurrency), который конвертирует сумму */
/* Статический метод setExchangeRate(currency, rate) для обновления курса */
class Account {
  static exchangeRates = { USD: 1, EUR: 0.92, RUB: 92.5 };

  static convert(amount, fromCurrency, toCurrency) {
    return (this.exchangeRates[fromCurrency] / this.exchangeRates[toCurrency]) * amount;
  }

  static setExchangeRate(currency, rate) {
    this.exchangeRates[currency] = rate;
  }

  constructor(id, balance) {
    this.id = id;
    this.balance = balance;
  }
}

console.log(Account.convert(100, 'USD', 'EUR'));
Account.setExchangeRate('EUR', 1.2);
console.log(Account.convert(100, 'USD', 'EUR'));

// Задание 5
// Создайте класс Order. Добавьте:
/* Статическое свойство lastOrderNumber */
/* Статический метод generateOrderNumber(), который генерирует номер заказа в формате 
"ORD-YYYY-MM-DD-XXXX" (XXXX - последовательный номер) */
/* При создании заказа автоматически присваивайте сгенерированный номер */
class Order {
  static lastOrderNumber = 0;

  static generateOrderNumber() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');

    this.lastOrderNumber++;
    const sequence = String(this.lastOrderNumber).padStart(4, '0');

    return `ORD-${yyyy}-${mm}-${dd}-${sequence}`;
  }

  constructor() {
    this.orderNumber = this.constructor.generateOrderNumber();
  }
}

const order1 = new Order();
const order2 = new Order();

console.log(order1.orderNumber);
console.log(order2.orderNumber);

// Задание 6
// Модифицируйте класс Vehicle. Добавьте статические фабричные методы:
// createCar(brand, year, doors) - создает автомобиль
// createMotorcycle(brand, year, type) - создает мотоцикл
// createTruck(brand, year, capacity) - создает грузовик
/* Каждый метод возвращает соответствующий экземпляр с предустановленными значениями типа 
транспорта. */
class Vehicle {
  constructor(brand, year, type) {
    this.brand = brand;
    this.year = year;
    this.type = type;
  }

  static createCar(brand, year, doors) {
    const car = new Vehicle(brand, year, 'car');
    car.doors = doors;
    return car;
  }

  static createMotorcycle(brand, year, motoType) {
    const moto = new Vehicle(brand, year, 'motorcycle');
    moto.motoType = motoType;
    return moto;
  }

  static createTruck(brand, year, capacity) {
    const truck = new Vehicle(brand, year, 'truck');
    truck.capacity = capacity;
    return truck;
  }
}

const car = Vehicle.createCar('Toyota', 2020, 4);
const moto = Vehicle.createMotorcycle('Yamaha', 2018, 'sport');
const truck = Vehicle.createTruck('Volvo', 2015, 10000);

console.log(car);
console.log(moto);
console.log(truck);

// Задание 7
// К классу User добавьте статические методы:
// createCustomer(name, age, email) - создает обычного пользователя
// createAdmin(name, age, accessLevel) - создает администратора
// createModerator(name, age, section) - создает модератора
// Каждый метод настраивает дополнительные свойства в зависимости от роли.
{
  class User {
    static id = 1;

    constructor(name, age) {
      this.name = name;
      this.age = age;
      this.id = this.constructor.id++;
    }

    static createCustomer(name, age, email) {
      const user = new User(name, age);
      user.role = 'customer';
      user.email = email;
      return user;
    }

    static createAdmin(name, age, accessLevel) {
      const user = new User(name, age);
      user.role = 'admin';
      user.accessLevel = accessLevel;
      return user;
    }

    static createModerator(name, age, section) {
      const user = new User(name, age);
      user.role = 'moderator';
      user.section = section;
      return user;
    }
  }

  const customer = User.createCustomer('Artem', 25, 'artemkutsan@gmail.com');
  const admin = User.createAdmin('Bob', 30, 5);
  const moderator = User.createModerator('Alice', 25, 'progamming');

  console.log(customer);
  console.log(admin);
  console.log(moderator);
}

// Задание 8
// К классу Account добавьте:
// Статическое свойство allAccounts (массив всех созданных счетов)
// Статический метод getTotalBalance() - возвращает общий баланс всех счетов
// Статический метод getAverageBalance() - возвращает средний баланс
// Статический метод findAccountById(id) - ищет счет по ID
{
  class Account {
    static allAccounts = [];

    constructor(balance = 0) {
      this.id = this.constructor.generateAccountID();
      this.balance = balance;
      this.constructor.allAccounts.push(this); // в конструкторе это обращение как Account.allAccounts
    }

    static getTotalBalance() {
      return this.allAccounts.reduce((total, account) => total + account.balance, 0); // в статическом методе this это обращение всегда к классу
    }

    static getAverageBalance() {
      return this.getTotalBalance() / this.allAccounts.length;
    }

    static findAccountById(id) {
      return this.allAccounts.find((account) => account.id === id);
    }

    static generateAccountID() {
      const accountID = 'ACC' + Math.random().toString().slice(2, 18).padStart(16, 0);

      if (this.allAccounts.some((account) => account.id === accountID)) {
        return this.generateAccountID();
      }

      return accountID;
    }
  }

  const account1 = new Account(1000);
  const account2 = new Account(2500);
  const account3 = new Account(1500);
  const account4 = new Account();

  console.log(Account.allAccounts);

  console.log(Account.getTotalBalance());

  console.log(Account.getAverageBalance());

  const idToFind = account2.id;
  const foundAccount = Account.findAccountById(idToFind);
  console.log(foundAccount);

  console.log(Account.findAccountById('ACC001'));
}

// 9. К классу Library добавьте статические методы:
// filterByGenre(books, genre) - фильтрует массив книг по жанру
// sortByYear(books) - сортирует книги по году издания
// getOldestBook(books) - находит самую старую книгу

// 10. Создайте класс Product и добавьте статические свойства и методы для системы скидок:
// Статическое свойство promoCodeDiscounts (объект с промокодами и размерами скидок)
// Статическое свойство holidayDiscount (праздничная скидка)
// Статический метод applyPromoCode(code) - применяет промокод к цене
// Статический метод calculateHolidayPrice(price) - применяет праздничную скидку
// Статический метод getBestDiscount(price, code) - выбирает лучшую скидку для клиента

// 11\*. Создайте класс WeatherService с:
// Статическим свойством cache (хранит результаты предыдущих запросов)
// Статическим свойством cacheTime (время жизни кэша в миллисекундах)
// Статическим методом getWeather(city) - если результат есть в кэше и он свежий, возвращает его, иначе делает "запрос" (симуляцию) и сохраняет в кэш
// Статическим методом clearCache() - очищает кэш
// Статическим методом getCacheStats() - возвращает статистику по кэшу

// class WeatherService {
//   static cache = '+5...+10';
//   static cacheTime = 20_000;
//   static getWeather(city) {}
//   static clearCache() {}
//   static getCacheStats() {}
// }

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
