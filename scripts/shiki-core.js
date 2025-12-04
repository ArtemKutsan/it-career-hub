// scripts/shiki-core.js

let highlighter = null;
let currentTheme = null;
let shikiModule = null; // кэш для импорта

export async function initHighlighter(theme) {
  if (highlighter && currentTheme === theme) return highlighter;

  if (!shikiModule) {
    shikiModule = await import('https://esm.sh/shiki@3.0.0');
  }

  const create = shikiModule.getSingletonHighlighter; // !!! getSingletonHighlighter

  if (!create) {
    throw new Error('Shiki: createHighlighter/getSingletonHighlighter отсутствует');
  }

  highlighter = await create({
    themes: [theme],
    langs: ['js', 'ts', 'tsx', 'json', 'html', 'css', 'scss', 'bash', 'txt'],
  });

  currentTheme = theme;

  return highlighter;
}

export async function highlight(code, lang, theme) {
  const highlighter = await initHighlighter(theme);

  return highlighter.codeToHtml(code, {
    lang,
    theme,
  });
}
