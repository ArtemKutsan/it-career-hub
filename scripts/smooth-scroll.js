// scripts/smooth-scroll.js
// Плавная прокрутка

let currentScroll = window.scrollY;
let targetScroll = window.scrollY;
let ease = 0.125; // чем меньше — тем плавнее

let isTicking = false;

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    targetScroll += e.deltaY; // сколько прокрутить
    targetScroll = Math.max(
      0,
      Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
    );

    if (!isTicking) {
      requestAnimationFrame(updateScroll);
      isTicking = true;
    }
  },
  { passive: false }
);

function updateScroll() {
  currentScroll += (targetScroll - currentScroll) * ease;

  window.scrollTo(0, currentScroll);

  if (Math.abs(targetScroll - currentScroll) > 0.5) {
    requestAnimationFrame(updateScroll);
  } else {
    isTicking = false;
  }
}
