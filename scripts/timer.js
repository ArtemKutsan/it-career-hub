const timeEl = document.querySelector("#current-time");
const zoneEl = document.querySelector("#current-zone");

const updateTime = () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  timeEl.textContent = `${timeStr}`;
  zoneEl.textContent = `${timezone}`;
};

updateTime(); // первое обновление

// Задержка до следующей минуты
const now = new Date();
const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
setTimeout(() => {
  updateTime();
  setInterval(updateTime, 60000); // Каждую минуту после
}, delay);
