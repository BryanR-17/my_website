let count = 0;
const nameText = "Alyssa";

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


/* ============ CAT CAFÉ MAZE LOGIC ============ */

let mazeTriggered = false;
let mazeVisible = false;

const mazeRows = 20;
const mazeCols = 20;

// start and goal positions in the grid
const startPos = { row: 1, col: 1 };
const goalPos  = { row: 18, col: 18 };

// build maze layout: 1 = wall, 0 = path
let mazeLayout = Array.from({ length: mazeRows }, () =>
    Array(mazeCols).fill(1)
);

// carve a long, winding path (challenging but solvable)
const pathCells = [
    // horizontal snakes across the grid
    // row 1
    ...Array.from({ length: 18 }, (_, i) => ({ row: 1, col: 1 + i })),
    // down
    { row: 2, col: 18 }, { row: 3, col: 18 }, { row: 4, col: 18 },
    // back left row 4
    ...Array.from({ length: 16 }, (_, i) => ({ row: 4, col: 17 - i })),
    // down
    { row: 5, col: 2 }, { row: 6, col: 2 },
    // row 6 right
    ...Array.from({ length: 15 }, (_, i) => ({ row: 6, col: 2 + i })),
    // down
    { row: 7, col: 17 }, { row: 8, col: 17 },
    // row 8 left
    ...Array.from({ length: 14 }, (_, i) => ({ row: 8, col: 16 - i })),
    // down
    { row: 9, col: 3 }, { row: 10, col: 3 },
    // row 10 right
    ...Array.from({ length: 13 }, (_, i) => ({ row: 10, col: 3 + i })),
    // down
    { row: 11, col: 15 }, { row: 12, col: 15 },
    // row 12 left
    ...Array.from({ length: 12 }, (_, i) => ({ row: 12, col: 14 - i })),
    // down
    { row: 13, col: 3 }, { row: 14, col: 3 },
    // row 14 right
    ...Array.from({ length: 13 }, (_, i) => ({ row: 14, col: 3 + i })),
    // down
    { row: 15, col: 15 }, { row: 16, col: 15 },
    // to goal row 18 col 18
    { row: 17, col: 15 }, { row: 18, col: 15 }, { row: 18, col: 16 },
    { row: 18, col: 17 }, { row: 18, col: 18 }
];

// carve the path into the wall grid
pathCells.forEach(c => {
    if (c.row >= 0 && c.row < mazeRows && c.col >= 0 && c.col < mazeCols) {
        mazeLayout[c.row][c.col] = 0;
    }
});

// player position
let playerPos = { ...startPos };

function openMaze() {
    const overlay = document.getElementById("maze-overlay");
    const grid = document.getElementById("maze-grid");
    const message = document.getElementById("maze-message");

    playerPos = { ...startPos };
    message.textContent = "";

    renderMaze();

    overlay.classList.add("show");
    mazeVisible = true;
}

function closeMaze() {
    const overlay = document.getElementById("maze-overlay");
    overlay.classList.remove("show");
    mazeVisible = false;
}

// render the whole grid
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

// move the player
function movePlayer(dr, dc) {
    if (!mazeVisible) return;

    const newRow = playerPos.row + dr;
    const newCol = playerPos.col + dc;

    if (
        newRow < 0 || newRow >= mazeRows ||
        newCol < 0 || newCol >= mazeCols
    ) return;

    if (mazeLayout[newRow][newCol] === 1) {
        // wall, can't move
        return;
    }

    playerPos = { row: newRow, col: newCol };
    renderMaze();

    if (playerPos.row === goalPos.row && playerPos.col === goalPos.col) {
        const msg = document.getElementById("maze-message");
        msg.textContent = "you found your way to my heart <3";
        setTimeout(() => {
            closeMaze();
        }, 2000);
    }
}

// keyboard controls
document.addEventListener("keydown", (e) => {
    if (!mazeVisible) return;

    if (e.key === "ArrowUp") {
        e.preventDefault();
        movePlayer(-1, 0);
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        movePlayer(1, 0);
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        movePlayer(0, -1);
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        movePlayer(0, 1);
    }
});

// button controls (for phone)
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("maze-btn")) {
        const dir = e.target.getAttribute("data-dir");
        if (dir === "up") movePlayer(-1, 0);
        if (dir === "down") movePlayer(1, 0);
        if (dir === "left") movePlayer(0, -1);
        if (dir === "right") movePlayer(0, 1);
    }
});

// close button
document.getElementById("maze-close").addEventListener("click", () => {
    closeMaze();
});

/* BACKGROUND CLICK TRIGGER (ONE TIME ONLY) */
document.addEventListener("click", (e) => {
    if (mazeTriggered) return;

    // ignore clicks on UI elements
    if (
        e.target.closest(".heart") ||
        e.target.closest("#name") ||
        e.target.closest("#message") ||
        e.target.closest("#cat-popup") ||
        e.target.closest("#maze-overlay")
    ) {
        return;
    }

    // first legit background click → open maze
    mazeTriggered = true;
    openMaze();
}, true);
