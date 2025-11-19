function revealMessage() {
    document.getElementById("message").classList.add("show");
}

// Floating hearts generator
function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.textContent = "💖";

    // Random horizontal position
    heart.style.left = Math.random() * 100 + "vw";

    // Random size
    heart.style.fontSize = (20 + Math.random() * 20) + "px";

    document.querySelector(".floating-hearts").appendChild(heart);

    // Remove after animation
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Create a heart every 400ms
setInterval(createFloatingHeart, 400);
