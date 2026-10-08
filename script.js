const pages = [
  ...document.querySelectorAll(".page")
];

let current = 0;

const progress = document.getElementById("progressBar");


/* ================================
   PAGE TRANSITION
================================ */

function goTo(id) {

  const target = document.getElementById(id);

  if (!target) return;

  const nextIndex = pages.indexOf(target);

  if (nextIndex === -1) return;

  pages[current].classList.remove("active");

  setTimeout(() => {

    target.classList.add("active");

    current = nextIndex;

    updateProgress();

  }, 250);
}


/* ================================
   BUTTONS
================================ */

document
  .querySelectorAll("[data-next]")
  .forEach(button => {

    button.addEventListener("click", () => {

      goTo(button.dataset.next);

    });

  });


/* ================================
   PROGRESS
================================ */

function updateProgress() {

  const percentage =
    (current / (pages.length - 1)) * 100;

  progress.style.width = percentage + "%";
}

updateProgress();


/* ================================
   RAIN
================================ */

const rain = document.getElementById("rain");

function createRain() {

  const drop = document.createElement("i");

  drop.style.position = "fixed";

  drop.style.left =
    Math.random() * 100 + "vw";

  drop.style.top = "-20px";

  drop.style.width =
    Math.random() * 1.5 + "px";

  drop.style.height =
    Math.random() * 25 + 15 + "px";

  drop.style.background =
    "rgba(180,160,220,.18)";

  drop.style.transform =
    "rotate(15deg)";

  drop.style.pointerEvents =
    "none";

  drop.style.zIndex = "2";

  drop.style.transition =
    "transform linear";

  const duration =
    Math.random() * 1.2 + .7;

  drop.style.transitionDuration =
    duration + "s";

  rain.appendChild(drop);

  requestAnimationFrame(() => {

    drop.style.transform =
      `translate(${Math.random() * 40 - 20}vw,110vh) rotate(15deg)`;

  });

  setTimeout(() => {

    drop.remove();

  }, duration * 1000);
}

setInterval(createRain, 85);


/* ================================
   STARS
================================ */

const stars = document.getElementById("stars");

for (let i = 0; i < 100; i++) {

  const star = document.createElement("span");

  star.style.position = "fixed";

  star.style.left =
    Math.random() * 100 + "vw";

  star.style.top =
    Math.random() * 100 + "vh";

  const size =
    Math.random() * 2 + 1;

  star.style.width =
    size + "px";

  star.style.height =
    size + "px";

  star.style.borderRadius =
    "50%";

  star.style.background =
    "#ffffff";

  star.style.opacity =
    Math.random() * .6;

  star.style.boxShadow =
    "0 0 8px rgba(210,190,255,.5)";

  star.style.animation =
    `twinkle ${Math.random() * 4 + 2}s infinite`;

  stars.appendChild(star);
}


/* ================================
   TWINKLE ANIMATION
================================ */

const style = document.createElement("style");

style.innerHTML = `
@keyframes twinkle {
  0%,100% {
    opacity:.15;
    transform:scale(.8);
  }

  50% {
    opacity:.8;
    transform:scale(1.3);
  }
}
`;

document.head.appendChild(style);


/* ================================
   TOUCH / CLICK SPARKLES
================================ */

document.addEventListener("pointerdown", event => {

  const sparkle =
    document.createElement("span");

  sparkle.style.position = "fixed";

  sparkle.style.left =
    event.clientX + "px";

  sparkle.style.top =
    event.clientY + "px";

  sparkle.style.width = "6px";
  sparkle.style.height = "6px";

  sparkle.style.borderRadius = "50%";

  sparkle.style.background = "#ffffff";

  sparkle.style.boxShadow =
    "0 0 18px 6px rgba(190,150,255,.7)";

  sparkle.style.pointerEvents = "none";

  sparkle.style.zIndex = "999";

  sparkle.style.transition =
    "all 1s ease";

  document.body.appendChild(sparkle);

  requestAnimationFrame(() => {

    sparkle.style.transform =
      "translateY(-45px) scale(0)";

    sparkle.style.opacity = "0";

  });

  setTimeout(() => {

    sparkle.remove();

  }, 1000);

});


/* ================================
   KEYBOARD
================================ */

document.addEventListener("keydown", event => {

  if (
    event.key === "ArrowRight" ||
    event.key === "Enter"
  ) {

    const next =
      pages[current + 1];

    if (next) {

      goTo(next.id);

    }

  }

});