/* -----------------------------------------------------
   1) TYPEWRITER MAIN MESSAGE
------------------------------------------------------ */

function revealMessage() {
    const message = document.getElementById("message");
    const text = "I wrote all this just to say… you mean more to me than you know. 💌";

    // Reveal box
    message.classList.remove("hidden");
    message.classList.add("show");

    message.textContent = "";
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            message.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 40);
        } else {
            // After typewriter ends → show button
            revealComplimentButton();
        }
    }

    typeWriter();
}

function revealComplimentButton() {
    document.getElementById("complimentBtn").classList.remove("hidden");
}



/* -----------------------------------------------------
   2) RANDOM COMPLIMENT GENERATOR (28 compliments)
------------------------------------------------------ */

const compliments = [
    "You are my sunshine. ✨",
    "You’re the love of my life. 💗",
    "Your smile is literally my favorite thing. 😊",
    "Thank you for being the best. 💕",
    "You are so swaggggyyy. 🌸",
    "Pressure makes diamionds so don't give up!!. 💎",
    "You are my home.",
    "You make the world feel warmer. ☀️",
    "You will always be my girl. 💕",
    "Your laugh is the cuteest ever. ❤️",
    "You make me want to be better. 🌷",
    "You’re beautiful without trying. 💖",
    "You make me feel safe. 🫶",
    "Your energy is the best. 🔥",
    "You make boring days feel special. ✨",
    "You’re my favorite person to be around. 💗",
    "You have the cutest voice ever.",
    "You’re way more amazing than you realize. 💞",
    "You make everything better.",
    "You’re someone I never want to lose. 💓",
    "You’re the best part of my day. 🧸",
    "You make even silence feel nice. 🤍",
    "You’re adorable without even trying. 🥺",
    "I will always be proud of you. ❤️",
    "You make the world feel less heavy. 🌤️",
    "You’re the cutest person on this planet. 🌍💗",
    "You are so special. ✨",
    "You’re my comfort person. Always. 🤍"
];

function showCompliment() {
    const c = document.getElementById("compliment");
    const random = compliments[Math.floor(Math.random() * compliments.length)];

    c.classList.remove("hidden");
    c.classList.add("show");
    c.textContent = random;
}



/* -----------------------------------------------------
   3) FLOATING HEART PARTICLES FOLLOW CURSOR
------------------------------------------------------ */

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
