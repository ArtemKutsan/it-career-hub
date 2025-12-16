/* course-html-css-js/homeworks/homework-25/scripts/script.js */

import { fetchAsText } from '../../../../scripts/fetch-as-text.js';
import { highlightPreBlocks } from '../../../../scripts/shiki-pre.js';

/* ===== START ===== */
// Homework 25
/*  */
const root = document.querySelector('#app-slider');

let sliderIndex = 0;
const images = [
  './assets/images/children-gazing-at-futuristic-spacecraft.png',
  './assets/images/futuristic-landscape-with-disc-structures.png',
  './assets/images/serene-otherworldly-landscape.png',
  './assets/images/surreal-children-and-ufos.png',
  './assets/images/surreal-children-in-futuristic-landscape.png',
];

const frame = document.createElement('div');
const cards = document.createElement('div');
const triggers = document.createElement('div');
const leftBtn = document.createElement('button');
const rightBtn = document.createElement('button');
const rounds = document.createElement('div');

triggers.append(leftBtn, rightBtn);
frame.append(cards, triggers, rounds);
root.append(frame);

frame.classList.add('frame');
cards.classList.add('cards');
triggers.classList.add('triggers');
rounds.classList.add('rounds');

leftBtn.textContent = '<';
rightBtn.textContent = '>';

images.forEach((image) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.style.backgroundImage = `url(${image})`;
  cards.append(card);
});

const slide = (index) => {
  sliderIndex = index;
  const width = frame.clientWidth;
  cards.style.left = `${-width * sliderIndex}px`;

  const allButtons = document.querySelectorAll('.rounds > button');
  allButtons.forEach((button, i) => button.classList.toggle('active', i === sliderIndex));
};

leftBtn.addEventListener('click', () => {
  if (sliderIndex > 0) {
    slide(sliderIndex - 1);
  }
});

rightBtn.addEventListener('click', () => {
  if (sliderIndex < images.length - 1) {
    slide(sliderIndex + 1);
  }
});

images.forEach((image, index) => {
  const button = document.createElement('button');
  rounds.append(button);

  button.addEventListener('click', () => {
    slide(index);
  });
});

slide(0);
/* ===== END ===== */

const resourceUrl1 = `./scripts/script.js`;
const resourceUrl2 = `./styles/styles.css`;

fetchAsText(resourceUrl1, resourceUrl2).then(async (results) => {
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
