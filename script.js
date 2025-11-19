// The message to type out
const secretMessage = "I just wanted to remind you that you mean the world to me. 💗";

function revealMessage() {
    const msg = document.getElementById("message");
    msg.classList.add("show"); // fade in
    msg.textContent = ""; // clear message for typing

    let i = 0;

    function typeWriter() {
        if (i < secretMessage.length) {
            msg.textContent += secretMessage.charAt(i);
            i++;
            setTimeout(typeWriter, 40); // typing speed
        }
    }

    typeWriter();
}

// Floating hearts generator (keep this)
function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.textContent = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (20 + Math.random() * 20) + "px";

    document.querySelector(".floating-hearts").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createFloatingHeart, 400);
