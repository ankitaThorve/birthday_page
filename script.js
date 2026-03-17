const hero = document.getElementById("hero");
const effects = document.getElementById("effects");

let balloonTimer = null;
let fireworksPlayed = false;

const colors = ["#ff5c8a", "#ffd700", "#ff9f1c", "#6a5acd", "#ffb6c1"];

/* 🎈 CREATE BALLOON */
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.className = "balloon";

  balloon.style.left = Math.random() * 100 + "vw";
  balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.animationDuration = Math.random() * 4 + 6 + "s";

  effects.appendChild(balloon);

  setTimeout(() => balloon.remove(), 10000);
}

/* 🎆 FIREWORKS (ONCE) */
function fireworks() {
  if (fireworksPlayed) return;
  fireworksPlayed = true;

  for (let i = 0; i < 6; i++) {
    const fw = document.createElement("div");
    fw.className = "firework";

    fw.style.left = Math.random() * 100 + "vw";
    fw.style.top = Math.random() * 50 + "vh";

    effects.appendChild(fw);
    setTimeout(() => fw.remove(), 1000);
  }
}

/* HERO VISIBILITY CONTROL */
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      if (!balloonTimer) {
        balloonTimer = setInterval(createBalloon, 700);
        fireworks();
      }
    } else {
      clearInterval(balloonTimer);
      balloonTimer = null;
      effects.innerHTML = "";
    }
  },
  { threshold: 0.6 }
);

observer.observe(hero);
