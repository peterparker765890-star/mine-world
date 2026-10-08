const scenes = [
  ...document.querySelectorAll(".scene")
];

let currentScene = 0;


/* =========================
   SCENE TRANSITIONS
========================= */

function showScene(id) {

  const nextScene = document.getElementById(id);

  if (!nextScene) return;

  const nextIndex = scenes.indexOf(nextScene);

  if (nextIndex === -1) return;

  scenes[currentScene].classList.remove("active");

  setTimeout(() => {

    nextScene.classList.add("active");

    currentScene = nextIndex;

  }, 250);
}


/* =========================
   BUTTONS
========================= */

document
  .querySelectorAll("[data-next]")
  .forEach(button => {

    button.addEventListener("click", () => {

      showScene(button.dataset.next);

    });

  });


/* =========================
   SHOOTING / TOUCH STARS
========================= */

document.addEventListener("pointerdown", event => {

  const sparkle = document.createElement("span");

  sparkle.style.position = "fixed";
  sparkle.style.left = event.clientX + "px";
  sparkle.style.top = event.clientY + "px";

  sparkle.style.width = "5px";
  sparkle.style.height = "5px";

  sparkle.style.borderRadius = "50%";

  sparkle.style.background = "#ffffff";

  sparkle.style.boxShadow =
    "0 0 18px 6px rgba(220,200,255,.7)";

  sparkle.style.pointerEvents = "none";

  sparkle.style.zIndex = "100";

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


/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", event => {

  if (event.key === "ArrowRight" || event.key === "Enter") {

    const next =
      scenes[currentScene + 1];

    if (next) {

      showScene(next.id);

    }

  }

});