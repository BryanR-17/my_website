let count = 0;
const nameText = "Alyssa 💕";

const firstMessage =
    "I wrote all this just to say… you mean more to me than you know. 💌";

const messages = [
    "You are my home.",
    "Your smile is the cutest.",
    "You make life better. 🌸",
    "You are my everything.",
    "You're my biggest blessing. 💖",
    "You make bad days disappear.",
    "I am so proud of you. ❤️",
    "You are my sunshine. 🌞",
    "I adore you.",
    "You don’t realize how amazing you are.",
    "You make me want to be better.",
    "You make everything warmer. 💕",
    "Your presence brings me peace.",
    "You have the sweetest soul.",
    "You're the swaggiest.",
    "You make silence comfortable. 🤍",
    "You're the love of my life.",
    "You're so rad. ✨",
    "You deserve everything.",
    "Te amo muchisimo.",
    "You make life worth livin. 💓",
    "I would die for you.",
    "You're beautiful without even trying.",
    "You are my world.",
    "You give me butterflies.",
    "You're the cutest human alive.",
    "Every part of you is special.",
    "You're my safe place."
];

function handleClick() {
    count++;

    const msg = document.getElementById("message");

    if (count === 1) {
        animateName(nameText);
        msg.textContent = firstMessage;
        return;
    }

    msg.textContent = messages[(count - 2) % messages.length];

    if (count % 5 === 0) {
        showCatVideo();
    }
}

/* LETTER BY LETTER EFFECT */
function animateName(text) {
    const nameBox = document.getElementById("name");
    nameBox.innerHTML = "";
    let i = 0;

    function reveal() {
        if (i < text.length) {
            let span = document.createElement("span");
            span.textContent = text[i];
            span.style.opacity = 0;
            span.style.display = "inline-block";
            span.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            span.style.transform = "translateY(10px)";
            nameBox.appendChild(span);

            setTimeout(() => {
                span.style.opacity = 1;
                span.style.transform = "translateY(0)";
            }, 40);

            i++;
            setTimeout(reveal, 120);
        }
    }
    reveal();
}

/* CAT VIDEO */
function showCatVideo() {
    const popup = document.getElementById("cat-popup");
    const video = document.getElementById("cat-video");

    popup.classList.add("show");
    video.currentTime = 0;
    video.muted = false;
    video.play();

    setTimeout(() => {
        popup.classList.remove("show");
        video.pause();
    }, 6500);
}

/* FLOATING HEARTS */
setInterval(() => {
    const container = document.getElementById("floating-hearts");
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.textContent = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "100vh";
    heart.style.fontSize = (15 + Math.random() * 15) + "px";
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 4000);
}, 200);

/* CURSOR TRAIL HEARTS */
document.addEventListener("mousemove", (e) => {
    const trail = document.createElement("div");
    trail.classList.add("cursor-heart");
    trail.textContent = "❤";
    trail.style.left = e.pageX + "px";
    trail.style.top = e.pageY + "px";

    document.getElementById("cursor-hearts").appendChild(trail);

    setTimeout(() => trail.remove(), 800);
});
