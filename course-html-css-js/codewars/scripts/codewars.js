/* Игра «Камень, Ножницы, Бумага».
   Логика: кодируем ходы числами по модулю 3.
   (p1 - p2 + 3) % 3 даёт:
   0 — ничья
   1 — победа игрока 1
   2 — победа игрока 2
*/

const rockPaperScissors = (p1, p2) => {
  const choice = { rock: 0, paper: 1, scissors: 2 };

  // Вычисление результата через арифметику по модулю 3.
  const winner = (choice[p1] - choice[p2] + 3) % 3;

  // 0 = ничья. 1 или 2 = номер победителя.
  return winner ? `Player ${winner} won!` : 'Draw!';
};

console.log(rockPaperScissors('rock', 'scissors'));
console.log(rockPaperScissors('scissors', 'paper'));
console.log(rockPaperScissors('paper', 'rock'));

console.log(rockPaperScissors('scissors', 'rock'));
console.log(rockPaperScissors('paper', 'scissors'));
console.log(rockPaperScissors('rock', 'paper'));

console.log(rockPaperScissors('scissors', 'paper'));
console.log(rockPaperScissors('scissors', 'rock'));
console.log(rockPaperScissors('paper', 'paper'));

/* Задача: сортировка слов по числу внутри слова.

   Алгоритм:
   — пустая строка → пустая строка;
   — каждое слово содержит одну цифру 1..9;
   — сортировка по найденной цифре.
*/

const order = (words) => {
  if (!words) return '';

  const result = [];

  words.split(' ').forEach((word) => {
    // sort() по символам: цифра окажется первой.
    // result['1'] = слово с цифрой 1, result['2'] = слово с цифрой 2, …
    result[word.split('').sort()[0]] = word;
  });

  return result.filter(Boolean).join(' ');
};

console.log(order('is2 Thi1s T4est 3a'));

/* Поиск следующего квадратного числа.

   Алгоритм:
   — вычислить sqrt(n);
   — если sqrt — целое → вернуть квадрат следующего целого;
   — иначе вернуть -1.
*/

const findNextSquare = (sq) => {
  const sqrt = sq ** 0.5;

  // Проверка на целочисленность: sqrt === ceil(sqrt)
  return sqrt === Math.ceil(sqrt) ? (sqrt + 1) ** 2 : -1;
};

console.log(findNextSquare(121));

/* Поиск индекса, где сумма слева = сумме справа.

   Приём:
   — общий суммарный total;
   — идём слева направо, поддерживая leftSum;
   — rightSum = total - leftSum - arr[i];
   — сравниваем.
*/

const findEvenIndex = (arr) => {
  const total = arr.reduce((acc, curr) => acc + curr, 0);
  let left = 0;

  for (let i = 0; i < arr.length; i++) {
    const right = total - left - arr[i];
    if (left === right) return i;
    left += arr[i];
  }

  return -1;
};

console.log(findEvenIndex([1, 2, 3, 4, 3, 2, 1]));

/* Поиск пропущенной буквы.

   Алгоритм:
   — код символа должен увеличиваться на 1 на каждом шаге;
   — если array[i] + 1 != array[i+1], то пропущенная = array[i] + 1.
*/

const findMissingLetter = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    const curr = array[i].charCodeAt(0);
    const next = array[i + 1].charCodeAt(0);
    if (curr + 1 !== next) return String.fromCharCode(curr + 1);
  }
  return ' ';
};

console.log(findMissingLetter(['a', 'b', 'c', 'd', 'f']));

/* Преобразование строки в camelCase.
   Разделители — дефис или подчёркивание.
   — разбиваем по /[-_]/
   — первую часть оставляем
   — каждое следующее слово капитализируем.
*/

const toCamelCase = (str) => {
  const parts = str.split(/[-_]/);

  for (let i = 1; i < parts.length; i++) {
    parts[i] = parts[i][0].toUpperCase() + parts[i].slice(1);
  }

  return parts.join('');
};

console.log(toCamelCase('the-stealth-warrior'));
console.log(toCamelCase('The_Stealth_Warrior'));

/* ROT13 шифр.
   — сдвиг на 13 позиций в пределах A-Z или a-z.
   — остальные символы не трогаем.
*/

const rot13 = (text) =>
  [...text]
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + 13) % 26) + 65);
      if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + 13) % 26) + 97);

      return char;
    })
    .join('');

console.log(rot13('Test'));
console.log(rot13('Test123!'));
console.log(rot13('Gur Dhvpx Jbeyq!'));
console.log(rot13('Gur Dhvpx Jbeyq123!'));
