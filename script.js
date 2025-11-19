/* ========================================= */
/*  HEART + NAME + COMPLIMENT + CAT VIDEO    */
/* ========================================= */

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

/* LETTER BY LETTER NAME */
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
    }, 6500); // 8 seconds
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


/* ========================================= */
/*                CAT CAFÉ MAZE              */
/* ========================================= */

let mazeTriggered = false;
let mazeVisible = false;

const mazeRows = 20;
const mazeCols = 20;

const startPos = { row: 1, col: 1 };
const goalPos  = { row: 18, col: 18 };

let mazeLayout = Array.from({ length: mazeRows }, () =>
    Array(mazeCols).fill(1)
);

/* LONG WINDING MAZE PATH */
const pathCells = [
    ...Array.from({ length: 18 }, (_, i) => ({ row: 1, col: 1 + i })),
    { row: 2, col: 18 }, { row: 3, col: 18 }, { row: 4, col: 18 },
    ...Array.from({ length: 16 }, (_, i) => ({ row: 4, col: 17 - i })),
    { row: 5, col: 2 }, { row: 6, col: 2 },
    ...Array.from({ length: 15 }, (_, i) => ({ row: 6, col: 2 + i })),
    { row: 7, col: 17 }, { row: 8, col: 17 },
    ...Array.from({ length: 14 }, (_, i) => ({ row: 8, col: 16 - i })),
    { row: 9, col: 3 }, { row: 10, col: 3 },
    ...Array.from({ length: 13 }, (_, i) => ({ row: 10, col: 3 + i })),
    { row: 11, col: 15 }, { row: 12, col: 15 },
    ...Array.from({ length: 12 }, (_, i) => ({ row: 12, col: 14 - i })),
    { row: 13, col: 3 }, { row: 14, col: 3 },
    ...Array.from({ length: 13 }, (_, i) => ({ row: 14, col: 3 + i })),
    { row: 15, col: 15 }, { row: 16, col: 15 },
    { row: 17, col: 15 }, { row: 18, col: 15 },
    { row: 18, col: 16 }, { row: 18, col: 17 }, { row: 18, col: 18 }
];

pathCells.forEach(c => {
    if (c.row >= 0 && c.row < mazeRows && c.col >= 0 && c.col < mazeCols) {
        mazeLayout[c.row][c.col] = 0;
    }
});

let playerPos = { ...startPos };

function openMaze() {
    const overlay = document.getElementById("maze-overlay");
    document.getElementById("maze-message").textContent = "";
    playerPos = { ...startPos };
    renderMaze();
    overlay.classList.add("show");
    mazeVisible = true;
}

function closeMaze() {
    document.getElementById("maze-overlay").classList.remove("show");
    mazeVisible = false;
}

function renderMaze() {
    const grid = document.getElementById("maze-grid");
    grid.innerHTML = "";

    for (let r = 0; r < mazeRows; r++) {
        for (let c = 0; c < mazeCols; c++) {

            const cell = document.createElement("div");
            cell.classList.add("maze-cell");

            if (mazeLayout[r][c] === 1) {
                cell.classList.add("maze-wall");
            } else {
                cell.classList.add("maze-path");
            }

            if (r === playerPos.row && c === playerPos.col) {
                cell.classList.add("maze-player");
                cell.textContent = "🐈";
            } else if (r === goalPos.row && c === goalPos.col) {
                cell.classList.add("maze-goal");
                cell.textContent = "🧶";
            }

            grid.appendChild(cell);
        }
    }
}

function movePlayer(dr, dc) {
    if (!mazeVisible) return;

    const newRow = playerPos.row + dr;
    const newCol = playerPos.col + dc;

    if (newRow < 0 || newRow >= mazeRows ||
        newCol < 0 || newCol >= mazeCols) return;

    if (mazeLayout[newRow][newCol] === 1) return;

    playerPos = { row: newRow, col: newCol };
    renderMaze();

    if (playerPos.row === goalPos.row && playerPos.col === goalPos.col) {
        document.getElementById("maze-message").textContent =
            "you found your way to my heart <3";
        setTimeout(closeMaze, 2000);
    }
}

/* KEYBOARD CONTROLS */
document.addEventListener("keydown", (e) => {
    if (!mazeVisible) return;

    if (e.key === "ArrowUp") movePlayer(-1, 0);
    if (e.key === "ArrowDown") movePlayer(1, 0);
    if (e.key === "ArrowLeft") movePlayer(0, -1);
    if (e.key === "ArrowRight") movePlayer(0, 1);
});

/* BUTTON CONTROLS */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("maze-btn")) {
        const dir = e.target.getAttribute("data-dir");
        if (dir === "up") movePlayer(-1, 0);
        if (dir === "down") movePlayer(1, 0);
        if (dir === "left") movePlayer(0, -1);
        if (dir === "right") movePlayer(0, 1);
    }
});

/* CLOSE BUTTON */
document.getElementById("maze-close").addEventListener("click", closeMaze);

/* BACKGROUND CLICK TRIGGER */
document.addEventListener("click", (e) => {
    if (mazeTriggered) return;

    // avoid triggering if clicking UI elements
    if (
        e.target.closest(".heart") ||
        e.target.closest("#name") ||
        e.target.closest("#message") ||
        e.target.closest("#cat-popup") ||
        e.target.closest("#maze-overlay")
    ) return;

    mazeTriggered = true;
    openMaze();
});
