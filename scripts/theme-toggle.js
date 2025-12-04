// scripts/theme-toggle.js
import { highlightPreBlocks } from "./shiki-pre.js";

const html = document.querySelector("html");
const themeToggleBtn = document.querySelector("#theme-toggle");

// Инициализация иконки
themeToggleBtn.innerHTML =
  localStorage.getItem("theme") === "dark"
    ? `<i class="bi bi-moon-fill text-lg"></i>`
    : `<i class="bi bi-sun-fill text-lg"></i>`;

// Переключение темы
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  const theme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", theme);

  themeToggleBtn.innerHTML =
    theme === "dark"
      ? `<i class="bi bi-moon-fill text-lg"></i>`
      : `<i class="bi bi-sun-fill text-lg"></i>`;

  localStorage.setItem("theme", theme);

  highlightPreBlocks();
});
