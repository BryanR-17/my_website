/* ----------------------------------------
   MAIN MESSAGES
-----------------------------------------*/

// First typewriter message
const firstMessage = "I wrote all this just to say… you mean more to me than you know. 💌";

let firstClickDone = false; // Tracks if we've shown the first message

// Compliments list (30 messages)
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



/* ----------------------------------------
   HEART CLICK HANDLER
-----------------------------------------*/

function heartClicked() {
    if (!firstClickDone) {
        firstClickDone = true;
        typeWriter(firstMessage);
    } else {
        showCompliment();
    }
}



/* ----------------------------------------
   TYPEWRITER EFFECT (first message only)
-----------------------------------------*/

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



/* ----------------------------------------
   RANDOM COMPLIMENT (after first click)
-----------------------------------------*/

function showCompliment() {
    const msg = document.getElementById("message");

    const random = compliments[Math.floor(Math.random() * compliments.length)];
    msg.textContent = random;

    msg.classList.remove("show");
    setTimeout(() => msg.classList.add("show"), 20);
}



/* ----------------------------------------
   FLOATING HEART PARTICLES
-----------------------------------------*/

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = hearts.length - 1; i >= 0; i--) {
        let h = hearts[i];

        ctx.globalAlpha = h.opacity;
        ctx.fillStyle = "rgba(255, 100, 150)";
        ctx.font = `${h.size}px serif`;
        ctx.fillText("❤", h.x, h.y);

        h.y -= h.speedY;
        h.x += h.speedX;
        h.opacity -= 0.02;

        if (h.opacity <= 0) hearts.splice(i, 1);
    }

    requestAnimationFrame(drawHearts);
}

drawHearts();
