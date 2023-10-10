const BOARDSIZE = 4;
let board = [];
let score = 0;

const newGame = document.getElementById("newGame");
newGame.addEventListener("click", () => {
  newGameStart();
});

document.addEventListener("DOMContentLoaded", () => {
  const bestScoreStart = localStorage.getItem("bestScore");

  bestScoreStart === null ? localStorage.setItem("bestScore", "0") : (document.getElementById("best-score").innerText = bestScoreStart);
});

function newGameStart() {
  score = 0;
  board = Array.from({ length: BOARDSIZE }, () => Array(BOARDSIZE).fill(0));
  setStartingValues();
  updateBoard();
  updateScore();
}

function setStartingValues() {
  const row = Math.floor(Math.random() * BOARDSIZE);
  const col = Math.floor(Math.random() * BOARDSIZE);
  board[row][col] = 2;
}

function updateBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  for (let i = 0; i < BOARDSIZE; i++) {
    for (let j = 0; j < BOARDSIZE; j++) {
      const tile = board[i][j];
      if (tile == 2048) {
        vinGame();
      }
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText = tile === 0 ? "" : tile;
      cell.style.backgroundColor = getTileColor(tile);
      boardElement.appendChild(cell);
    }
  }
}

function vinGame() {
  Swal.fire({
    title: "You are beautiful, congratulations on your victory your score is: " + score,
    width: 600,
    padding: "3em",
    customClass: {
      heightAuto: false,
      popup: "custom-popup",
      confirmButton: "custom-confirm-button",
    },
    confirmButtonText: "UWU",
    color: "#fff",
    background: "#d383d2",
    backdrop: `
      rgba(0,0,123,0.4)
      url("../images/happy-cat.gif")
      left top
    `,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      newGameStart();
    }
  });
}

function getTileColor(value) {
  const colors = {
    2: "#00d0a4",
    4: "#dd7373",
    8: "#7d53de",
    16: "#6622cc",
    32: "#00bfb2",
    64: "#c06ff2",
    128: "#340068",
    256: "#3e92cc",
    512: "#d8315b",
    1024: "#1c0b19",
    2048: "#1c0b19",
  };
  return colors[value] || "#6e5f74";
}

function moveUp() {
  let isMoved = false;
  for (let col = 0; col < BOARDSIZE; col++) {
    let merged = false;
    for (let row = 1; row < BOARDSIZE; row++) {
      if (board[row][col] !== 0) {
        let i = row;
        for (; i > 0 && board[i - 1][col] === 0; i--) {
          board[i - 1][col] = board[i][col];
          board[i][col] = 0;
        }
        if (i > 0 && board[i - 1][col] === board[i][col] && !merged) {
          score += board[i - 1][col];
          board[i - 1][col] *= 2;
          board[i][col] = 0;
          merged = true;
        }
        isMoved = true;
      }
    }
  }
  return isMoved;
}

function moveDown() {
  let isMoved = false;
  for (let col = 0; col < BOARDSIZE; col++) {
    let merged = false;
    for (let row = BOARDSIZE - 2; row >= 0; row--) {
      if (board[row][col] !== 0) {
        let i = row;
        for (; i < BOARDSIZE - 1 && board[i + 1][col] === 0; i++) {
          board[i + 1][col] = board[i][col];
          board[i][col] = 0;
        }
        if (i < BOARDSIZE - 1 && board[i + 1][col] === board[i][col] && !merged) {
          score += board[i + 1][col];
          board[i + 1][col] *= 2;
          board[i][col] = 0;
          merged = true;
        }
        isMoved = true;
      }
    }
  }
  return isMoved;
}

function moveLeft() {
  let isMoved = false;
  for (let row = 0; row < BOARDSIZE; row++) {
    let merged = false;
    for (let col = 1; col < BOARDSIZE; col++) {
      if (board[row][col] !== 0) {
        let j = col;
        for (; j > 0 && board[row][j - 1] === 0; j--) {
          board[row][j - 1] = board[row][j];
          board[row][j] = 0;
        }
        if (j > 0 && board[row][j - 1] === board[row][j] && !merged) {
          score += board[row][j - 1];
          board[row][j - 1] *= 2;
          board[row][j] = 0;
          merged = true;
        }
        isMoved = true;
      }
    }
  }
  return isMoved;
}

function moveRight() {
  let isMoved = false;
  for (let row = 0; row < BOARDSIZE; row++) {
    let merged = false;
    for (let col = BOARDSIZE - 2; col >= 0; col--) {
      if (board[row][col] !== 0) {
        let j = col;
        for (; j < BOARDSIZE - 1 && board[row][j + 1] === 0; j++) {
          board[row][j + 1] = board[row][j];
          board[row][j] = 0;
        }
        if (j < BOARDSIZE - 1 && board[row][j + 1] === board[row][j] && !merged) {
          score += board[row][j + 1];
          board[row][j + 1] *= 2;
          board[row][j] = 0;
          merged = true;
        }
        isMoved = true;
      }
    }
  }
  return isMoved;
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.innerText = score;
}

function spawnRandomTile() {
  const emptyCells = [];
  for (let i = 0; i < BOARDSIZE; i++) {
    for (let j = 0; j < BOARDSIZE; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell.row][randomCell.col] = 1024;
  }
}

function checkGameOver() {
  for (let i = 0; i < BOARDSIZE; i++) {
    for (let j = 0; j < BOARDSIZE; j++) {
      if (
        board[i][j] === 0 ||
        (i < BOARDSIZE - 1 && board[i][j] === board[i + 1][j]) ||
        (j < BOARDSIZE - 1 && board[i][j] === board[i][j + 1])
      ) {
        return false;
      }
    }
  }
  return true;
}

document.addEventListener("keydown", (event) => {
  const originalBoard = JSON.parse(JSON.stringify(board));
  let moved = false;

  if (event.key === "ArrowUp") {
    moved = moveUp();
  } else if (event.key === "ArrowDown") {
    moved = moveDown();
  } else if (event.key === "ArrowLeft") {
    moved = moveLeft();
  } else if (event.key === "ArrowRight") {
    moved = moveRight();
  }

  if (moved) {
    updateScore();

    if (!compareBoards(originalBoard, board)) {
      spawnRandomTile();
    }
    updateBoard();

    if (checkGameOver()) {
      gameOver();
    }
  }
});

function gameOver() {
  Swal.fire({
    title: "You lost, score is: " + score,
    width: 600,
    padding: "3em",
    customClass: {
      heightAuto: false,
      popup: "custom-popup",
      confirmButton: "custom-confirm-button",
    },
    confirmButtonText: ":(",
    color: "#fff",
    background: "#49433e",
    backdrop: `
      rgba(0,0,123,0.4)
      url("../images/rain.gif")
      left top
    `,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      const bestScore = localStorage.getItem("bestScore");
      if (bestScore < score) {
        localStorage.setItem("bestScore", score);
        document.getElementById("best-score").innerText = score;
      }
      newGameStart();
    }
  });
}

function compareBoards(board1, board2) {
  for (let i = 0; i < BOARDSIZE; i++) {
    for (let j = 0; j < BOARDSIZE; j++) {
      if (board1[i][j] !== board2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

newGameStart();
