// scripts/log-to-page.js
import { highlightPreBlocks } from "./shiki-pre.js";

// ----------------------------------------
// Форматирование значений
// ----------------------------------------
const formatValue = (v, depth = 0, seen = new WeakSet()) => {
  const indent = "  ".repeat(depth);

  if (v === null) return "null";
  if (v === undefined) return "undefined";
  if (typeof v === "string") return `"${v}"`;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "function") return `[Function ${v.name || "anonymous"}]`;
  if (typeof v !== "object") return String(v);

  if (seen.has(v)) return "[Circular]";
  seen.add(v);

  if (v instanceof Element) return v.outerHTML;
  if (v instanceof NodeList || v instanceof HTMLCollection) {
    const arr = Array.from(v);
    return (
      "[\n" +
      arr
        .map((x) => indent + "  " + formatValue(x, depth + 1, seen))
        .join(",\n") +
      "\n" +
      indent +
      "]"
    );
  }
  if (Array.isArray(v)) {
    return (
      "[\n" +
      v
        .map((x) => indent + "  " + formatValue(x, depth + 1, seen))
        .join(",\n") +
      "\n" +
      indent +
      "]"
    );
  }

  const keys = Object.keys(v);
  if (keys.length === 0) return "{}";

  return (
    "{\n" +
    keys
      .map((k) => indent + "  " + k + ": " + formatValue(v[k], depth + 1, seen))
      .join(",\n") +
    "\n" +
    indent +
    "}"
  );
};

// ----------------------------------------
// Определение языка
// ----------------------------------------
const extractLanguage = (text) => {
  if (typeof text !== "string") return { lang: null, content: text };
  const lines = text.split("\n");
  const idx = lines.findIndex((l) => l.trim() !== "");
  if (idx === -1) return { lang: null, content: text };

  const first = lines[idx].trim().split(" ");
  if (first[0] !== "//" || first.length < 2)
    return { lang: null, content: text };

  const lang = first[1];
  lines[idx] = first.slice(2).join(" ");
  return { lang, content: lines.join("\n") };
};

const removeInternalNewlinesInBlockComment = (str) => {
  if (typeof str !== "string") return str;

  return str.replace(/\/\*[\s\S]*?\*\//g, (block) => {
    return block.replace(/\r?\n+/g, ""); // \u00A0
  });
};

// ----------------------------------------
// Создание и подсветка <pre>
// ----------------------------------------
const output = async (type, ...args) => {
  const container = document.getElementById("console");
  if (!container) return;

  let lang = null;
  const text = args
    .map((a) => {
      if (typeof a === "string") {
        a = removeInternalNewlinesInBlockComment(a);
        const r = extractLanguage(a);
        if (r.lang) lang = r.lang;
        return r.content;
      }
      if (typeof a === "object") return formatValue(a);
      return String(a);
    })
    .join("\n");

  const pre = document.createElement("pre");
  pre.textContent = text;
  if (lang) pre.classList.add(`language-${lang}`);
  container.appendChild(pre);

  await highlightPreBlocks(container);
};

// ----------------------------------------
// Патч консоли
// ----------------------------------------
["log", "warn", "error"].forEach((method) => {
  const orig = console[method];
  console[method] = (...args) => {
    orig(...args);
    output(method, ...args);
  };
});

window.onerror = (msg, src, line, col) => {
  output("error", `Ошибка: ${msg} (${src}:${line}:${col})`);
};

window.onunhandledrejection = (e) => {
  output("error", "Unhandled promise rejection:", e.reason);
};
