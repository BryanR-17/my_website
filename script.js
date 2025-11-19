/* -----------------------
       GLOBAL HEARTS
------------------------*/

document.addEventListener("mousemove", (e) => {
    const h = document.createElement("div");
    h.classList.add("heart-float");
    h.style.left = e.pageX + "px";
    h.style.top = e.pageY + "px";
    h.textContent = "♥";
    document.body.appendChild(h);

    setTimeout(() => h.remove(), 2000);
});

/* -----------------------
      NAME ANIMATION
------------------------*/

function showName() {
    const name = "Alyssa";
    const container = document.getElementById("name-container");
    container.innerHTML = "";

    [...name].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.classList.add("letter");
        span.style.animationDelay = `${i * 0.2}s`;
        container.appendChild(span);
    });

    container.style.opacity = 1;
}

/* -----------------------
   CLICK → FIRST MESSAGE
------------------------*/

let count = 0;

const firstMessage = 
"I wrote all this just to say… you mean more to me than you know. 💌";

const messages = [
"You are my home.",
"Your smile is the cutest.",
"You make life better. 🌸",
"You are my everything.",
"You're my biggest blessing. 💝",
"You make bad days disappear.",
"I am so proud of you. ❤️",
"You are my sunshine. 🌞",
"I adore you.",
"You don’t realize how amazing you are.",
"You make me want to be better.",
"You make everything warmer. 💗",
"Your presence brings me peace.",
"You have the sweetest soul.",
"You're the swaggiest.",
"You make silence comfortable. 🤍",
"You are the love of my life.",
"You're so rad. ✨",
"You deserve everything.",
"Te amo muchísimo.",
"You make life worth livin. 💞",
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

    let msg = document.getElementById("message");

    // First click
    if (count === 1) {
        msg.textContent = firstMessage;
        showName();
        return;
    }

    msg.textContent = messages[(count - 2) % messages.length];

    // Cat video every 5 clicks
    if (count % 5 === 0) {
        showCatVideo();
    }
}

/* -----------------------
      CAT VIDEO POPUP
------------------------*/

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
    }, 8000);
}

/* -----------------------
          MAZE
------------------------*/

// 10x10 maze
const maze = [
 [0,1,1,1,1,1,1,1,1,1],
 [0,0,0,0,1,0,0,0,0,1],
 [1,0,1,0,1,0,1,1,0,1],
 [1,0,1,0,0,0,0,1,0,1],
 [1,0,1,1,1,1,0,1,0,0],
 [1,0,0,0,0,1,0,1,1,0],
 [1,1,1,1,0,1,0,0,0,0],
 [1,0,0,1,0,0,0,1,1,1],
 [1,0,1,1,1,1,0,0,0,1],
 [1,0,0,0,0,0,1,1,0,0]
];

let player = { x: 0, y: 0 };
const goal = { x: 9, y: 9 };

function buildMaze() {
    const grid = document.getElementById("maze-grid");
    grid.innerHTML = "";

    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            const cell = document.createElement("div");
            cell.classList.add("maze-cell");

            if (maze[y][x] === 1) cell.classList.add("maze-wall");
            if (player.x === x && player.y === y) cell.textContent = "🐈";
            if (goal.x === x && goal.y === y) cell.textContent = "🧶";

            grid.appendChild(cell);
        }
    }
}

function showMaze() {
    document.getElementById("maze-wrapper").classList.remove("hidden");
    buildMaze();
}

function hideMaze() {
    document.getElementById("maze-wrapper").classList.add("hidden");
}

document.addEventListener("keydown", (e) => {
    const moves = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }
    };

    if (!moves[e.key]) return;

    const nx = player.x + moves[e.key].x;
    const ny = player.y + moves[e.key].y;

    if (nx < 0 || ny < 0 || nx >= 10 || ny >= 10) return;
    if (maze[ny][nx] === 1) return;

    player.x = nx;
    player.y = ny;

    buildMaze();

    if (player.x === goal.x && player.y === goal.y) {
        setTimeout(() => {
            alert("You found your way to my heart ❤️");
            hideMaze();
            player = { x: 0, y: 0 };
        }, 200);
    }
});

let mazeActivated = false;

document.addEventListener("click", (e) => {
    if (mazeActivated) return;
    if (e.target.closest(".heart")) return;

    mazeActivated = true;
    showMaze();
});
