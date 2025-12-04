// scripts/shiki-pre.js
import { highlight } from './shiki-core.js';

export async function highlightPreBlocks(container = document.body) {
  const shikiTheme = localStorage.getItem('theme') === 'dark' ? 'rose-pine-moon' : 'rose-pine-dawn';

  const blocks = container.querySelectorAll('pre');

  for (const pre of blocks) {
    const langClass = [...pre.classList].find((className) => className.startsWith('language-'));
    const lang = langClass ? langClass.replace('language-', '') : 'txt';

    const code = pre.textContent;

    const html = await highlight(code, lang, shikiTheme);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    const newPre = wrapper.firstElementChild;
    if (langClass) newPre.classList.add(langClass);

    pre.replaceWith(newPre);
  }
}
