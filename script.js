const progressBar = document.getElementById("progressBar");
const stars = document.getElementById("stars");
const rain = document.getElementById("rain");

/* SCROLL PROGRESS */

function updateProgress() {
  const scrollTop = window.scrollY;
  const height =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = height > 0
    ? (scrollTop / height) * 100
    : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress, {
  passive: true
});

updateProgress();


/* STARS */

for (let i = 0; i < 130; i++) {
  const star = document.createElement("span");

  star.className = "star";
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${2 + Math.random() * 4}s`;

  stars.appendChild(star);
}


/* RAIN */

for (let i = 0; i < 65; i++) {
  const drop = document.createElement("span");

  drop.className = "raindrop";
  drop.style.left = `${Math.random() * 100}%`;
  drop.style.animationDelay = `${Math.random() * 5}s`;
  drop.style.animationDuration = `${0.8 + Math.random() * 1.2}s`;

  rain.appendChild(drop);
}


/* SMOOTH NAVIGATION */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


/* CINEMATIC CLICK SPARKLES */

document.addEventListener("click", event => {
  if (event.target.closest("a")) return;

  const sparkle = document.createElement("span");

  sparkle.style.position = "fixed";
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;
  sparkle.style.width = "5px";
  sparkle.style.height = "5px";
  sparkle.style.borderRadius = "50%";
  sparkle.style.background = "#f0abfc";
  sparkle.style.boxShadow = "0 0 15px #f0abfc";
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "200";

  document.body.appendChild(sparkle);

  sparkle.animate(
    [
      {
        opacity: 1,
        transform: "scale(1) translate(0, 0)"
      },
      {
        opacity: 0,
        transform: "scale(0) translate(0, -25px)"
      }
    ],
    {
      duration: 700,
      easing: "ease-out"
    }
  );

  setTimeout(() => sparkle.remove(), 700);
});