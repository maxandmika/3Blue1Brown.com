// fades in any element with the data-fade attribute when it comes into view

// options
const duration = 250; // transition duration
const delay = 10; // delay before transition
const offset = 100; // extra delay for items further to right of screen

// create fade listeners
const createFades = () => {
  const elements = document.querySelectorAll("[data-fade]");
  for (const element of elements) {
    new IntersectionObserver(fadeInView).observe(element);
    element.style.opacity = 0;
  }
};

// when element comes into view
let fadeInView = (entries) => {
  for (const { target, isIntersecting } of entries)
    if (isIntersecting) {
      const x = target.getBoundingClientRect().left / window.innerWidth;
      window.setTimeout(() => startFade(target), delay + 3 * offset * x);
    }
};

// start fade in
const startFade = (target) => {
  target.style.transition = `opacity ${duration}ms linear`;
  target.style.opacity = 1;
  window.setTimeout(() => endFade(target), duration);
};

// end fade in
const endFade = (target) => {
  target.style.transition = "";
  target.removeAttribute("data-fade");
};

// start script
window.addEventListener("DOMContentLoaded", createFades);
