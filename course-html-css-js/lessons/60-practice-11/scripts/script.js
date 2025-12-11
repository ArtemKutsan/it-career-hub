/* course-html-css-js/lessons/60-practice-11/scripts/scripts.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// 60 Practice 11

// Задача 1
/* Создать класс "Калькулятор" с использованием статических методов и свойств. Класс должен иметь 
статическое свойство "PI", содержащее значение числа Пи, и статический метод "add", который 
принимает произвольное количество чисел и возвращает их сумму. */
class Calcuator {
  static PI = Math.PI;

  static add(...args) {
    return [...args].reduce((a, b) => a + b);
  }
}

let sum = Calcuator.add(1, 2, 3);
console.log(sum);

// Задача 2
/* Реализовать класс "Банковский счет" с использованием статического метода 
"generateAccountNumber". Метод должен генерировать и возвращать уникальный номер счета. Уникальный 
номер должен состоять из префикса "ACC" и случайного числа, а также должен быть уникальным для 
каждого экземпляра класса. */
const accounts = [];

class Account {
  static generateAccountNumber() {
    const accountNumber = 'ACC' + Math.random().toString().slice(2);
    if (accounts.includes(accountNumber)) Account.generateAccountNumber();

    return accountNumber;
  }

  constructor() {
    this.number = Account.generateAccountNumber();
  }
}

Account.generateAccountNumber();

const account = new Account();
console.log(account.number);

// Задача 3
/* Создать класс "Студент" с использованием статического метода "getAverageGrade". Метод должен 
принимать неограниченное количество оценок студента и возвращать среднюю оценку. Кроме того, класс 
должен иметь статическое свойство "passingGrade", которое определяет минимальную оценку для сдачи 
курса. */
class Student {
  static passingGrade = 4;

  static getAverageGrade(...grades) {
    if (grades.length === 0) return 0;

    const sum = grades.reduce((a, b) => a + b, 0);

    return sum / grades.length;
  }
}

const student1Avg = Student.getAverageGrade(5, 4, 3);
const student2Avg = Student.getAverageGrade(4, 4, 3);
console.log(student1Avg >= Student.passingGrade ? 'Студент 1 сдал' : 'Студент 1 не сдал');
console.log(student2Avg >= Student.passingGrade ? 'Студент 2 сдал' : 'Студент 2 не сдал');

// Задача 4 *
/* Реализовать класс "Математика" с использованием статических методов "factorial" и "fibonacci". 
Метод "factorial" должен принимать число и возвращать его факториал, используя рекурсию. Метод
"fibonacci" должен принимать число и возвращать последовательность Фибоначчи до этого числа, 
используя рекурсию. */
class Mathematics {
  static factorial(n) {
    if (n < 0) throw new Error('У отрицательного числа нельзя посчитать факториал');
    if (n === 0 || n === 1) return 1; // базовый случай

    return n * Mathematics.factorial(n - 1);
  }

  static fibonacci(n) {
    // Базовые случаи
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const sequence = Mathematics.fibonacci(n - 1);
    const next = sequence[sequence.length - 1] + sequence[sequence.length - 2];

    sequence.push(next);

    return sequence;
  }
}

console.log(Mathematics.factorial(5));
console.log(Mathematics.fibonacci(10));

// Задача 5
/* Создать класс "Время" с использованием статического метода "getCurrentTime". Метод должен 
возвращать текущее время в формате "часы:минуты:секунды", а также должен иметь статическое 
свойство "timeZone", которое определяет часовой пояс. */
class Time {
  static timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  static getCurrentTime() {
    const now = new Date();

    return now.toLocaleString('sv-SE', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}

console.log(Time.getCurrentTime(), Time.timeZone);

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
