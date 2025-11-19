let count = 0;

const firstMessage =
    "I wrote all this just to say… you mean more to me than you know. 💌";

const messages = [
    "You are my home.",
    "Your smile is the cutest.",
    "You make life better. 🌸",
    "You are my everything.",
    "You're my biggest blessing. 💗",
    "You make bad days disappear.",
    "I am so proud of you. ❤️",
    "You are my sunshine. 🌞",
    "I adore you.",
    "You don’t realize how amazing you are.",
    "You make me want to be better.",
    "You make everything warmer. 💕",
    "Your presence brings me peace.",
    "You have the sweetest soul.",
    "You’re the swaggiest.",
    "You make silence comfortable. 🤍",
    "You are the love of my life.",
    "You’re so rad. ✨",
    "You deserve everything.",
    "Te amo muchisimo.",
    "You make life worth livin. 💞",
    "I would die for you.",
    "You're beautiful without even trying.",
    "You are my world.",
    "You give me butterflies.",
    "You're the cutest human alive.",
    "Every part of you is special.",
    "You always make me feel safe.",
    "You're my safe place."
];

function handleClick() {
    count++;

    const msg = document.getElementById("message");
    const svg = document.getElementById("nameSVG");
    const paths = document.querySelectorAll("#nameSVG path");

    if (count === 1) {
        msg.textContent = firstMessage;

        // show SVG
        svg.classList.add("show");

        // handwriting effect
        paths.forEach((p, i) => {
            p.style.animation = `draw 2.2s ease forwards ${i * 0.4}s`;
        });

        // floating AFTER writing is done
        setTimeout(() => {
            svg.style.animation = "floatName 3s ease-in-out infinite";
        }, 3500);

        triggerHeartExplosion();
        return;
    }

    msg.textContent = messages[(count - 2) % messages.length];

    if (count % 5 === 0) showCatVideo();
}

/* SVG HANDWRITING KEYFRAME */
const style = document.createElement("style");
style.innerHTML = `
@keyframes draw {
    to { stroke-dashoffset: 0; }
}`;
document.head.appendChild(style);

/* CAT VIDEO POPUP */
function showCatVideo() {
    const popup = document.getElementById("cat-popup");
    const video = document.getElementById("cat-video");
    const heart = document.querySelector(".heart");
    const rect = heart.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const bottomY = rect.bottom;

    popup.style.left = `${centerX}px`;
    popup.style.top = `${bottomY + 20}px`;

    popup.classList.add("show");
    video.currentTime = 0;
    video.muted = false;
    video.play();

    setTimeout(() => {
        popup.classList.remove("show");
        video.pause();
    }, 8000);
}

/* HEART EXPLOSION */
function triggerHeartExplosion() {
    const heart = document.querySelector(".heart");
    heart.classList.add("heart-explode");

    heart.addEventListener("animationend", () => {
        heart.classList.remove("heart-explode");
    }, { once: true });
}

/* CURSOR HEART TRAIL */
document.addEventListener("mousemove", (e) => {
    const heart = document.createElement("span");
    heart.className = "cursor-heart";
    heart.textContent = "♥";
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
});

/* FLOATING HEARTS */
function createBackgroundHeart() {
    const heart = document.createElement("span");
    heart.className = "bg-heart";
    heart.textContent = "♥";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = 14 + Math.random() * 16 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createBackgroundHeart, 800);
