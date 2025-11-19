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
    const name = document.getElementById("nameReveal");

    if (count === 1) {
        msg.textContent = firstMessage;

        // fade in Alyssa
        name.classList.add("show");

        // start floating after fade starts
        setTimeout(() => {
            name.style.animation = "floatName 3s ease-in-out infinite";
        }, 200);

        triggerHeartExplosion();
        return;
    }

    msg.textContent = messages[(count - 2) % messages.length];

    if (count % 5 === 0) {
        showCatVideo();
    }
}

/* HEART EXPLOSION */
function triggerHeartExplosion() {
    const heart = document.querySelector(".heart");
    heart.classList.add("heart-explode");

    heart.addEventListener(
        "animationend",
        () => {
            heart.classList.remove("heart-explode");
        },
        { once: true }
    );

    const rect = heart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const burstCount = 10;
    const radius = 70;

    for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;

        const span = document.createElement("span");
        span.textContent = "♥";
        span.className = "burst-heart";
        span.style.left = `${centerX}px`;
        span.style.top = `${centerY}px`;
        span.style.setProperty("--dx", `${dx}px`);
        span.style.setProperty("--dy", `${dy}px`);

        document.body.appendChild(span);

        setTimeout(() => span.remove(), 800);
    }
}

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

/* FLOATING BACKGROUND HEARTS */
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
