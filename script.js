const scenes = [...document.querySelectorAll(".scene")];
const progressBar = document.getElementById("progressBar");

let currentIndex = 0;


/* =========================
   SCENE NAVIGATION
========================= */

function showScene(id) {
  const target = document.getElementById(id);

  if (!target) return;

  scenes.forEach(scene => {
    scene.classList.remove("active");
  });

  target.classList.add("active");

  currentIndex = scenes.indexOf(target);

  const progress =
    (currentIndex / (scenes.length - 1)) * 100;

  progressBar.style.width = `${progress}%`;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   BUTTON NAVIGATION
========================= */

document.querySelectorAll("[data-next]").forEach(button => {

  button.addEventListener("click", event => {

    event.stopPropagation();

    showScene(button.dataset.next);

  });

});


/* =========================
   STAR FIELD
========================= */

const stars = document.getElementById("stars");

for (let i = 0; i < 110; i++) {

  const star = document.createElement("span");

  star.className = "star";

  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;

  const size = Math.random() * 2 + 1;

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.animationDelay =
    `${Math.random() * 4}s`;

  star.style.animationDuration =
    `${2 + Math.random() * 4}s`;

  stars.appendChild(star);
}


/* =========================
   RAIN
========================= */

const rain = document.getElementById("rain");

for (let i = 0; i < 70; i++) {

  const drop = document.createElement("span");

  drop.className = "raindrop";

  drop.style.left =
    `${Math.random() * 100}%`;

  drop.style.animationDuration =
    `${0.7 + Math.random() * 1.1}s`;

  drop.style.animationDelay =
    `${Math.random() * 2}s`;

  drop.style.opacity =
    `${0.15 + Math.random() * 0.4}`;

  rain.appendChild(drop);
}


/* =========================
   CLICK SPARKLES
========================= */

document.addEventListener("click", event => {

  /*
   Don't create sparkles when clicking
   navigation buttons.
  */

  if (event.target.closest("button")) {
    return;
  }

  for (let i = 0; i < 8; i++) {

    const sparkle =
      document.createElement("span");

    sparkle.style.position = "fixed";

    sparkle.style.left =
      `${event.clientX}px`;

    sparkle.style.top =
      `${event.clientY}px`;

    sparkle.style.width = "5px";
    sparkle.style.height = "5px";

    sparkle.style.borderRadius = "50%";

    sparkle.style.background =
      i % 2 === 0
        ? "#c084fc"
        : "#f0abfc";

    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "999";

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      25 + Math.random() * 45;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;

    sparkle.animate(
      [
        {
          transform:
            "translate(-50%,-50%) scale(1)",
          opacity: 1
        },

        {
          transform:
            `translate(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px)
            ) scale(0)`,
          opacity: 0
        }
      ],
      {
        duration: 650,
        easing:
          "cubic-bezier(.2,.7,.2,1)"
      }
    );

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 700);
  }

});


/* =========================
   KEYBOARD NAVIGATION
========================= */

document.addEventListener("keydown", event => {

  if (event.key === "ArrowDown") {

    if (currentIndex < scenes.length - 1) {

      event.preventDefault();

      showScene(
        scenes[currentIndex + 1].id
      );
    }
  }


  if (event.key === "ArrowUp") {

    if (currentIndex > 0) {

      event.preventDefault();

      showScene(
        scenes[currentIndex - 1].id
      );
    }
  }

});


/* =========================
   NO TOUCH-SWIPE NAVIGATION
=========================

   IMPORTANT:
   We intentionally removed the
   touchstart/touchend swipe code.

   Your phone can now scroll/touch
   normally without accidentally
   jumping to another scene.
*/


/* =========================
   INITIAL PROGRESS
========================= */

progressBar.style.width = "0%";