/* --------------------------------------------------
   FIRST MESSAGE + COMPLIMENTS
-------------------------------------------------- */

const firstMessage = "I wrote all this just to say… you mean more to me than you know. 💌";
let firstClickDone = false;

const compliments = [
    "You are my home.",
    "Your smile is the cutest.",
    "You make life better. 🌸",
    "You are my everything.",
    "You’re my biggest blessing. 💗",
    "You make bad days disappear.",
    "I am so proud of you. ❤️",
    "You are my sunshine. ☀️",
    "I adore you.",
    "You don’t realize how amazing you are.",
    "You make me want to be better.",
    "You make everything warmer. 🌷",
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
    "You’re beautiful without even trying.",
    "You are my world.",
    "You give me butterflies.",
    "You're the cutest human alive.",
    "Every part of you is special.",
    "You're my safe place."
];

function heartClicked() {
    const heart = document.getElementById("mainHeart");

    // hide click me text on first click
    document.getElementById("clickText").style.display = "none";

    if (!firstClickDone) {
        firstClickDone = true;

        popHeart();       
        showFirstMessage();

        // bring heart back
        setTimeout(() => {
            heart.style.opacity = "1";
            heart.style.pointerEvents = "auto";
        }, 1500);

    } else {
        createSparkles();
        showCompliment();
    }
}

/* --------------------------------------------------
   HEART EXPLOSION (SMOOTH)
-------------------------------------------------- */

const popCanvas = document.getElementById("popCanvas");
const popCtx = popCanvas.getContext("2d");
popCanvas.width = window.innerWidth;
popCanvas.height = window.innerHeight;

let poppingHearts = [];

function popHeart() {
    const heart = document.getElementById("mainHeart");
    const rect = heart.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    heart.style.opacity = "0";
    heart.style.pointerEvents = "none";

    for (let i = 0; i < 40; i++) {
        poppingHearts.push({
            x: centerX,
            y: centerY,
            size: Math.random() * 16 + 10,
            speedX: (Math.random() - 0.5) * 5,
            speedY: (Math.random() - 0.5) * 5,
            gravity: 0.05,
            opacity: 1
        });
    }
}

function drawPopHearts() {
    popCtx.clearRect(0, 0, popCanvas.width, popCanvas.height);

    for (let i = poppingHearts.length - 1; i >= 0; i--) {
        let h = poppingHearts[i];

        popCtx.globalAlpha = h.opacity;
        popCtx.font = `${h.size}px serif`;
        popCtx.fillText("💖", h.x, h.y);

        h.x += h.speedX;
        h.y += h.speedY;
        h.speedY += h.gravity;
        h.opacity -= 0.01;

        if (h.opacity <= 0) poppingHearts.splice(i, 1);
    }

    requestAnimationFrame(drawPopHearts);
}
drawPopHearts();

/* --------------------------------------------------
   FIRST MESSAGE REVEAL
-------------------------------------------------- */

function showFirstMessage() {
    const msg = document.getElementById("message");
    msg.textContent = firstMessage;

    setTimeout(() => msg.classList.add("show"), 400);
}

/* --------------------------------------------------
   COMPLIMENTS
-------------------------------------------------- */

function showCompliment() {
    const msg = document.getElementById("message");
    const random = compliments[Math.floor(Math.random() * compliments.length)];

    msg.classList.remove("show");
    msg.textContent = random;

    setTimeout(() => msg.classList.add("show"), 20);
}

/* --------------------------------------------------
   CURSOR FLOATING HEARTS
-------------------------------------------------- */

const heartCanvas = document.getElementById("heartCanvas");
const hctx = heartCanvas.getContext("2d");

heartCanvas.width = window.innerWidth;
heartCanvas.height = window.innerHeight;

let hearts = [];

document.addEventListener("mousemove", function(e) {
    for (let i = 0; i < 2; i++) {
        hearts.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 6 + 4,
            speedY: Math.random() * 0.7 + 0.5,
            speedX: (Math.random() - 0.5),
            opacity: 1
        });
    }
});

function drawHearts() {
    hctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

    for (let i = hearts.length - 1; i >= 0; i--) {
        let h = hearts[i];

        hctx.globalAlpha = h.opacity;
        hctx.font = `${h.size}px serif`;
        hctx.fillText("❤", h.x, h.y);

        h.x += h.speedX;
        h.y -= h.speedY;
        h.opacity -= 0.015;

        if (h.opacity <= 0) hearts.splice(i, 1);
    }

    requestAnimationFrame(drawHearts);
}
drawHearts();

/* --------------------------------------------------
   BACKGROUND FLOATING HEARTS
-------------------------------------------------- */

const bgCanvas = document.getElementById("bgHeartsCanvas");
const bgCtx = bgCanvas.getContext("2d");

bgCanvas.width = window.innerWidth;
bgCanvas.height = window.innerHeight;

let bgHearts = [];

setInterval(() => {
    bgHearts.push({
        x: Math.random() * bgCanvas.width,
        y: bgCanvas.height + 30,
        size: Math.random() * 18 + 8,
        speedY: Math.random() * 0.4 + 0.2,
        opacity: Math.random() * 0.4 + 0.3
    });
}, 600);

function drawBackgroundHearts() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    for (let i = bgHearts.length - 1; i >= 0; i--) {
        let h = bgHearts[i];

        bgCtx.globalAlpha = h.opacity;
        bgCtx.font = `${h.size}px serif`;
        bgCtx.fillText("❤", h.x, h.y);

        h.y -= h.speedY;

        if (h.y < -40) bgHearts.splice(i, 1);
    }

    requestAnimationFrame(drawBackgroundHearts);
}
drawBackgroundHearts();

/* --------------------------------------------------
   SPARKLES
-------------------------------------------------- */

const sparkleCanvas = document.getElementById("sparkleCanvas");
const sctx = sparkleCanvas.getContext("2d");

sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;

let sparkles = [];

function createSparkles() {
    const heart = document.getElementById("mainHeart");
    const rect = heart.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 15; i++) {
        sparkles.push({
            x,
            y,
            size: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 3,
            speedY: (Math.random() - 0.5) * 3,
            opacity: 1
        });
    }
}

function drawSparkles() {
    sctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

    for (let i = sparkles.length - 1; i >= 0; i--) {
        let s = sparkles[i];

        sctx.globalAlpha = s.opacity;
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        sctx.fillStyle = "#ff99d6";
        sctx.fill();

        s.x += s.speedX;
        s.y += s.speedY;
        s.opacity -= 0.03;

        if (s.opacity <= 0) sparkles.splice(i, 1);
    }

    requestAnimationFrame(drawSparkles);
}
drawSparkles();
