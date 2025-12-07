/* course-html-css-js/lessons/55-practice-10/scripts/scripts.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 56 Summary 10

/* 1. Создайте базовый класс Vehicle со свойствами brand и year. Добавьте метод start(), который 
выводит "Транспортное средство заводится". Создайте класс Motorcycle, наследующий Vehicle, с 
дополнительным свойством engineType(тип двигателя). Переопределите метод start() для вывода 
"Мотоцикл [brand] заводится с рыча". */
class Vehicle {
  constructor(brand, year) {
    this.brand = brand;
    this.year = year;
  }

  start() {
    console.log('Транспортное средство заводится.');
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, year, engineType) {
    super(brand, year);
    this.engineType = engineType;
  }

  start() {
    console.log(`Мотоцикл ${this.brand} заводится рыча.`);
  }
}

const vehicle = new Vehicle('Audi', '2020');
vehicle.start();

const motorcycle = new Motorcycle('Honda', '2025');
motorcycle.start();

/* 2. Создайте базовый класс Shape со свойствами name и color. Добавьте метод describe(), который 
выводит "Это [color] фигура [name]". Создайте класс Circle, наследующий Shape, с дополнительным 
свойством radius. Переопределите метод describe() для вывода "Это [color] круг с радиусом [radius]". */
class Shape {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  describe() {
    console.log(`Это ${this.color} фигура ${this.name}.`);
  }
}

class Circle extends Shape {
  constructor(name, color, radius) {
    super(name, color);
    this.radius = radius;
  }

  describe() {
    console.log(`Это ${this.color} круг с радиусом ${this.radius}.`);
  }
}

const shape = new Shape('Фигура', 'красный');
shape.describe();

const circle = new Circle('Круг', 'черный', 10);
circle.describe();

/* 3.Создайте базовый класс Gadget со свойствами model и price. Добавьте метод turnOn(). Создайте 
класс Smartphone, наследующий Gadget, с дополнительными свойствами os и cameraMp. Переопределите 
метод turnOn() для вывода "Смартфон [model] загружает систему [os]". */
class Gadget {
  constructor(model, price) {
    this.model = model;
    this.price = price;
  }

  turnOn() {
    console.log(`Гаджет ${this.model} включается.`);
  }
}

class Smartphone extends Gadget {
  constructor(model, price, os, cameraMp) {
    super(model, price);
    this.os = os;
    this.cameraMp = cameraMp;
  }

  turnOn() {
    console.log(`Смартфон ${this.model} загружает систему ${this.os}.`);
  }
}

const gadget = new Gadget('Плеер', 100);
gadget.turnOn();

const smartphone = new Smartphone('iPhone', 1000, 'iOS 16', '16 Mpx');
smartphone.turnOn();

/* 4.На основе вашего класса Account создайте класс CheckingAccount (Текущий счет). Добавьте 
свойство transactionFee (комиссия за операцию). Переопределите методы deposit() и withdraw() 
так, чтобы с каждой операцией списывалась комиссия (например, при снятии 100 со счета уйдет 
100 + комиссия). */
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

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`Со счета ${this.id} снято ${amount}. Новый баланс: ${this.balance}`);
    } else {
      console.log('Недостаточно средств');
    }
  }
}

class CheckingAccount extends Account {
  constructor(id, balance, transactionFee) {
    super(id, balance);
    this.transactionFee = transactionFee;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount - this.transactionFee;
      console.log(
        `Счет: ${this.id} пополнен на ${amount}. Комиссия: ${this.transactionFee}. Новый баланс: ${this.balance}`
      );
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount + this.transactionFee <= this.balance) {
      this.balance -= amount + this.transactionFee;
      console.log(
        `Со счета ${this.id} снято ${amount}. Комиссия: ${this.transactionFee}. Новый баланс: ${this.balance}`
      );
    } else {
      console.log('Недостаточно средств');
    }
  }
}

const basic = new Account('ACC001', 100);
const checking = new CheckingAccount('ACC002', 100, 10);

basic.deposit(50);
checking.deposit(50);
basic.withdraw(30);
checking.withdraw(30);

console.log(`Аккаунт ${basic.id}, баланс: ${basic.balance}`);
console.log(`Аккаунт ${checking.id}, баланс: ${checking.balance}`);

/* 5. На основе вашего класса Library создайте класс RatedLibrary. Добавьте метод 
rateBook(title, rating), который добавляет рейтинг книге, и метод getTopRated(), который 
возвращает книги с рейтингом выше 4. */
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
}

class RatedLibrary extends Library {
  rateBook(title, rating) {
    this.books.forEach((book) => {
      if (book.title === title) {
        book.rating = rating;
      }
    });
  }

  getTopRated() {
    return this.books.filter((book) => book.rating >= 4);
  }
}

const ratedLibrary = new RatedLibrary();
ratedLibrary.addBook('Атлант расправил плечи', 'Айн Рэнд');
ratedLibrary.addBook('Источник', 'Айн Рэнд');
ratedLibrary.addBook('1984', 'Джордж Орвелл');
ratedLibrary.addBook('Эффект бабочки', 'Рэй Брэдбери');
ratedLibrary.rateBook('Эффект бабочки', 3);
ratedLibrary.rateBook('Атлант расправил плечи', 5);
ratedLibrary.rateBook('1984', 4);

console.log('Книги с рэйтингом 4 и выше":', ratedLibrary.getTopRated());

/* 6. На основе вашего класса User создайте класс ActiveUser. Добавьте свойство lastLogin 
(дата последнего входа) и метод updateLogin() для обновления этой даты. Также добавьте метод 
getDaysSinceLastLogin(), который возвращает сколько дней прошло с последнего входа. */
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  get isAdmin() {
    return this instanceof Admin; // true только для объектов класса Admin и его наследников
  }

  displayInfo() {
    console.log(`Имя: ${this.name}, Возраст: ${this.age}`);
  }
}

class ActiveUser extends User {
  lastLogin = null;

  updateLogin() {
    this.lastLogin = Date.now();
  }

  getDaysSinceLastLogin() {
    return (Date.now() - this.lastLogin) / 86_400_000;
  }
}

const user = new ActiveUser('Artem', 44);
user.updateLogin();

setTimeout(() => console.log(user.getDaysSinceLastLogin()), 1000);

/* 7. На основе вашего класса Animal создайте класс Cat. Добавьте свойства color (цвет) и isIndoor 
(домашняя ли кошка). Создайте метод meow(), который выводит "Мяу!", и метод getDescription(), 
который возвращает строку типа "Белый домашний кот по имени Барсик". */
class Animal {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}

class Cat extends Animal {
  constructor(name, color, isIndoor) {
    super(name, 'кот');
    this.color = color;
    this.isIndoor = isIndoor;
  }

  meow() {
    console.log('Мяу!');
  }

  getDescription() {
    const color = this.color.charAt(0).toUpperCase() + this.color.slice(1);
    const indoor = this.isIndoor ? 'домашний ' : '';
    console.log(`${color} ${indoor}${this.type} по имени ${this.name}`);
  }
}

const cat = new Cat('Мурзик', 'белый', true);
cat.meow();
cat.getDescription();

/* 8. На основе вашего класса Admin создайте класс SuperAdmin. Добавьте свойство permissions 
(массив строк прав, например ['delete_users', 'edit_roles']). Добавьте методы addPermission(perm) 
и hasPermission(perm), который проверяет наличие конкретного права. */
class Admin extends User {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  displayRole() {
    console.log(`Роль: ${this.role}`);
  }
}

class SuperAdmin extends Admin {
  permissions = ['delete_users', 'edit_roles'];

  addPermission(permission) {
    this.permissions.push(permission);
  }

  hasPermission(permission) {
    return this.permissions.includes(permission);
  }
}

const artem = new SuperAdmin('Artem', 44, 'Суперадминистратор');
artem.displayInfo();
artem.displayRole();
console.log(`Право удалять пользователей ("delete_users"): ${artem.hasPermission('delete_users')}`);

/* 9. На основе вашего класса SavingsAccount создайте класс LimitedSavingsAccount. Добавьте 
свойство withdrawalLimit (лимит снятия в месяц). Переопределите метод withdraw() так, чтобы он 
проверял, не превышен ли лимит снятий за текущий месяц. */
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

class LimitedSavingsAccount extends SavingsAccount {
  totalWithdraws = 0;

  constructor(id, balance, interestRate, withdrawalLimit) {
    super(id, balance, interestRate);
    this.withdrawalLimit = withdrawalLimit;
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log('Сумма должна быть больше нуля');
      return;
    }

    if (amount > this.balance) {
      console.log('Недостаточно средств');
      return;
    }

    if (this.totalWithdraws + amount > this.withdrawalLimit) {
      const available = this.withdrawalLimit - this.totalWithdraws;
      console.log(`Превышен лимит снятия в месяц. Доступно: ${available}`);
      return;
    }

    this.balance -= amount;
    this.totalWithdraws += amount;

    console.log(`Со счета ${this.id} снято ${amount}. Новый баланс: ${this.balance}`);
  }
}

const account = new LimitedSavingsAccount('AСС001', 1000, 0.05, 500);

account.withdraw(200);
account.withdraw(250);
account.withdraw(200);

/* 10. Создайте базовый класс Product со свойствами name, price, quantity. Добавьте методы 
getTotalCost() и applyDiscount(percent). Создайте класс FoodProduct, наследующий Product, с 
дополнительными свойствами expiryDate и category. Добавьте метод isExpired(). */
class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getTotalCost() {
    return this.price * this.quantity;
  }

  applyDiscount(percent) {
    if (percent > 0 || percent < 100) {
      const discount = this.price * (percent / 100);
      console.log(`Скидка: ${discount}. Цена со скидой: ${this.price - discount}`);
    } else {
      console.log('Неверный процент скидки');
    }
  }
}

class FoodProduct extends Product {
  constructor(name, price, quantity, expiryDate, category) {
    super(name, price, quantity);
    this.expiryDate = expiryDate;
    this.category = category;
  }

  isExpired() {
    return Date.now() > this.expiryDate.getTime();
  }
}
const product = new Product('Notebook', 100, 3);

console.log(`Общая стоимость ${product.name}: ${product.getTotalCost()}`);

product.applyDiscount(10);

const freshDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
const expiredDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

const foodProduct1 = new FoodProduct('Яблоко', 2, 10, freshDate, 'фрукты');
const foodProduct2 = new FoodProduct('Молоко', 1.5, 1, expiredDate, 'молочка');

console.log(`${foodProduct1.name} просрочено? ${foodProduct1.isExpired()}`);
console.log(`${foodProduct2.name} просрочено? ${foodProduct2.isExpired()}`);

/* 11. Создайте базовый класс Course со свойствами title, durationHours, students (массив имен). 
Добавьте методы addStudent(name) и getStudentCount(). Создайте класс PaidCourse, наследующий 
Course, с дополнительными свойствами price и discount. Добавьте метод getFinalPrice(). */
class Course {
  constructor(title, durationHours, students = []) {
    this.title = title;
    this.durationHours = durationHours;
    this.students = students;
  }

  addStudent(name) {
    this.students.push(name);
  }

  getStudentCount() {
    return this.students.length;
  }
}

class PaidCourse extends Course {
  constructor(title, durationHours, students = [], price, discount = 0) {
    super(title, durationHours, students);
    this.price = price;
    this.discount = discount;
  }

  getFinalPrice() {
    if (this.discount < 0 || this.discount > 100) return null;
    return this.price * (1 - this.discount / 100);
  }
}

const course = new Course('JS Basics', 20);
course.addStudent('Alice');
course.addStudent('Max');
console.log(course.getStudentCount());

const paidCourse = new PaidCourse('Web Developer', 1500, ['Artem', 'Sergey'], 20000, 10);
paidCourse.addStudent('Olga');
console.log(paidCourse.getStudentCount());
console.log(paidCourse.getFinalPrice());

/* 12. Создайте базовый класс Character со свойствами name, health, level. Добавьте методы 
takeDamage(amount) и heal(amount). Создайте класс Warrior, наследующий Character, с 
дополнительными свойствами strength и armor. Переопределите метод takeDamage() с учетом брони. */
class Character {
  constructor(name, health, level) {
    this.name = name;
    this.health = health;
    this.level = level;
  }

  takeDamage(amount) {
    if (amount <= 0) return;
    this.health = Math.max(0, this.health - amount);
  }

  heal(amount) {
    if (amount <= 0) return;
    this.health += amount;
  }
}

class Warrior extends Character {
  constructor(name, health, level, strength, armor) {
    super(name, health, level);
    this.strength = strength;
    this.armor = armor;
  }

  takeDamage(amount) {
    if (amount <= 0) return;
    const effective = Math.max(0, amount - this.armor);
    this.health = Math.max(0, this.health - effective);
  }
}

const character = new Character('Max', 100, 1);
character.takeDamage(30);
console.log(character.health);
character.heal(20);
console.log(character.health);

const warrior = new Warrior('Artem', 150, 5, 50, 20);
warrior.takeDamage(40);
console.log(warrior.health);
warrior.takeDamage(10);
console.log(warrior.health);

/* 13. Создайте базовый класс Movie со свойствами title, duration, genre. Добавьте метод 
getInfo(). Создайте класс MovieSession, наследующий Movie, с дополнительными свойствами time, 
hallNumber, ticketPrice. Добавьте методы calculateRevenue(audienceCount) и 
isFullHall(audienceCount). */
class Movie {
  constructor(title, duration, genre) {
    this.title = title;
    this.duration = duration;
    this.genre = genre;
  }

  getInfo() {
    console.log(`${this.title}, ${this.duration} мин, жанр: ${this.genre}`);
  }
}

class MovieSession extends Movie {
  constructor(title, duration, genre, time, hallNumber, ticketPrice, hallCapacity) {
    super(title, duration, genre);
    this.time = time;
    this.hallNumber = hallNumber;
    this.ticketPrice = ticketPrice;
    this.hallCapacity = hallCapacity;
  }

  calculateRevenue(audienceCount) {
    if (audienceCount < 0) return 0;
    return audienceCount * this.ticketPrice;
  }

  isFullHall(audienceCount) {
    if (this.hallCapacity == null) return null;
    return audienceCount >= this.hallCapacity;
  }
}

const movie = new Movie('Inception', 148, 'Sci-Fi');
movie.getInfo();

const movieSession = new MovieSession('Inception', 148, 'Sci-Fi', '18:30', 2, 12, 120);
movieSession.getInfo();
console.log('Доход при 100 зрителях:', movieSession.calculateRevenue(100));
console.log('Полный ли зал при 120 зрителях:', movieSession.isFullHall(120));
console.log('Полный ли зал при 90 зрителях:', movieSession.isFullHall(90));

// 14.Создайте базовый класс Athlete со свойствами name, country, personalRecord. Добавьте метод train(hours), который увеличивает personalRecord. Создайте класс Sprinter, наследующий Athlete, с дополнительным свойством speed. Добавьте метод compete(opponentSpeed) который сравнивает скорости.

// 15. Создайте базовый класс SmartDevice со свойствами name, isOn, consumption. Добавьте методы togglePower() и getDailyConsumption(hours). Создайте класс SmartThermostat, наследующий SmartDevice, с дополнительными свойствами currentTemp и targetTemp. Добавьте методы setTemperature(temp) и getEnergyEfficiency().

// 16.Создайте базовый класс Employee → наследуйте Manager → наследуйте SeniorManager. Каждый уровень добавляет новые свойства и методы, а также расширяет существующие. Например: Employee (name, salary), Manager (department, team), SeniorManager (budget, approveExpenses()).
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
