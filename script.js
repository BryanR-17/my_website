let count = 0;

const firstMessage =
    "I wrote all this just to say… you mean more to me than you know. 💌";

const messages = [
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

function handleClick() {
    count++;

    let msg = document.getElementById("message");

    // First click → special message
    if (count === 1) {
        msg.textContent = firstMessage;
        return;
    }

    // After first click → cycle compliments
    msg.textContent = messages[(count - 2) % messages.length];

    // Every 5 clicks → show cat video with sound
    if (count % 5 === 0) {
        showCatVideo();
    }
}

function showCatVideo() {
    const popup = document.getElementById("cat-popup");
    const video = document.getElementById("cat-video");

    popup.classList.add("show");
    video.currentTime = 0;

    // PLAY WITH SOUND
    video.muted = false;
    video.play();

    // hide after 4 seconds
    setTimeout(() => {
        popup.classList.remove("show");
        video.pause();
    }, 4000);
}
