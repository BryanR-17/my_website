/* ----------------------------------------
   FIRST MESSAGE + COMPLIMENTS
-----------------------------------------*/

const firstMessage = "I wrote all this just to say… you mean more to me than you know. 💌";
let firstClickDone = false;

const compliments = [
    "You are my home.",
    "Your smile is my favorite place.",
    "You make life softer. 🌸",
    "You make everything feel lighter.",
    "You’re a blessing I didn’t expect. 💗",
    "You make bad days disappear.",
    "Your laugh is everything. 😭❤️",
    "You are sunshine in human form. ☀️",
    "I adore your heart.",
    "You don’t realize how amazing you are.",
    "You make me want to be better.",
    "You make everything warmer. 🌷",
    "Your presence feels like peace.",
    "You have the sweetest soul.",
    "You’re someone I never want to lose.",
    "You make silence comfortable. 🤍",
    "You are loved more than you know.",
    "Your energy is unmatched. ✨",
    "You make the world feel softer.",
    "You deserve every good thing.",
    "You make life feel romantic. 💞",
    "You’re my favorite person.",
    "You’re beautiful without even trying.",
    "You feel like destiny.",
    "You make my heart rest.",
    "You're the cutest human alive.",
    "Every part of you is special.",
    "You're my safe place."
];


/* ------------------ HEART CLICK MAIN LOGIC ------------------- */
function heartClicked() {
    createSparkles(); // ✨ sparkle effect

    if (!firstClickDone) {
        firstClickDone = true;
        typeWriter(firstMessage);
    } else {
        showCompliment();
    }
}


/* ------------------ TYPEWRITER ------------------- */
function typeWriter(text) {
    const msg = document.getElementById("message");
    msg.textContent = "";
    msg.classList.remove("show");

    let i = 0;
    function write() {
        if (i < text.length) {
            msg.textContent += text.charAt(i);
            i++;
            setTimeout(write, 40);
        } else {
            msg.classList.add("show");
        }
    }
    write();
}


/* ------------------ COMPLIMENTS ------------------- */
function showCompliment() {
    const msg = document.getElementById("message");
    const random = compliments[Math.floor(Math.random() * compliments.length)];

    msg.classList.remove("show");
    msg.textContent = random;
    setTimeout(() => msg.classList.add("show"), 20);
}


/* ----------------------------------------
   FLOATING HEART PARTICLES
-----------------------------------------*/

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
            speedY: Math.random() * 1 + 0.5,
            speedX: (Math.random() - 0.5) * 1,
            opacity: 1
        });
    }
});

function drawHearts() {
    hctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

    for (let i = hearts.length - 1; i >= 0; i--) {
        let h = hearts[i];

        hctx.globalAlpha = h.opacity;
        hctx.fillStyle = "rgba(255, 100, 150)";
        hctx.font = `${h.size}px serif`;
        hctx.fillText("❤", h.x, h.y);

        h.y -= h.speedY;
        h.x += h.speedX;
        h.opacity -= 0.02;

        if (h.opacity <= 0) hearts.splice(i, 1);
    }

    requestAnimationFrame(drawHearts);
}

drawHearts();


/* ----------------------------------------
   ✨ SPARKLES ON HEART CLICK
-----------------------------------------*/

const sparkleCanvas = document.getElementById("sparkleCanvas");
const sctx = sparkleCanvas.getContext("2d");

sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;

let sparkles = [];

function createSparkles() {
    const heart = document.querySelector(".big-heart");
    const rect = heart.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    for (let i = 0; i < 15; i++) {
        sparkles.push({
            x,
            y,
            size: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 4,
            speedY: (Math.random() - 0.5) * 4,
            opacity: 1
        });
    }
}

function drawSparkles() {
    sctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

    for (let i = sparkles.length - 1; i >= 0; i--) {
        let s = sparkles[i];

        sctx.globalAlpha = s.opacity;
        sctx.fillStyle = "#ff99d6";
        sctx.beginPath();
        sctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        sctx.fill();

        s.x += s.speedX;
        s.y += s.speedY;
        s.opacity -= 0.03;

        if (s.opacity <= 0) sparkles.splice(i, 1);
    }

    requestAnimationFrame(drawSparkles);
}

drawSparkles();
