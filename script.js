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
    "You make silence comfortable. 💜",
    "You are the love of my life.",
    "You're so rad. ✨",
    "You deserve everything.",
    "Te amo muchísimo.",
    "You make life worth livin’. 💞",
    "I would die for you.",
    "You're beautiful without even trying.",
    "You are my world.",
    "You give me butterflies. 🦋",
    "You're the cutest human alive.",
    "Every part of you is special.",
    "You're my safe place."
];

// FIRST CLICK triggers name + message
function handleClick() {
    count++;

    let msg = document.getElementById("message");

    // First click → special message + name animation
    if (count === 1) {
        msg.textContent = firstMessage;

        // Fade in and write name
        const nameBox = document.getElementById("name-container");
        const path = document.getElementById("alyssa-path");

        nameBox.style.opacity = "1";
        path.style.animation = "writeName 3s ease forwards";

        return;
    }

    // After first click → rotate compliments
    msg.textContent = messages[(count - 2) % messages.length];

    // Every 5 clicks → cat video
    if (count % 5 === 0) {
        showCatVideo();
    }
}

function showCatVideo() {
    const popup = document.getElementById("cat-popup");
    const video = document.getElementById("cat-video");

    popup.classList.add("show");
    video.currentTime = 0;
    video.muted = false;
    video.play();

    // hide after full 8 seconds
    setTimeout(() => {
        popup.classList.remove("show");
        video.pause();
    }, 7000);
}
