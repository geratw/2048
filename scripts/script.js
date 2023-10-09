const boardSize = 4;
let board = [];
let score = 0;

function initializeBoard() {
  board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
  setStartingValues();
  updateBoard();
}

function setStartingValues() {
  const row = Math.floor(Math.random() * boardSize);
  const col = Math.floor(Math.random() * boardSize);
  board[row][col] = 2;
}

function updateBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      const tile = board[i][j];
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.innerText = tile === 0 ? "" : tile;
      cell.style.backgroundColor = getTileColor(tile);
      boardElement.appendChild(cell);
    }
  }
}

function getTileColor(value) {
  const colors = {
    2: "#eee4da",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e",
  };
  return colors[value] || "#3c3a32";
}

function moveUp() {
  let isMoved = false;
  for (let col = 0; col < boardSize; col++) {
    let merged = false;
    for (let row = 1; row < boardSize; row++) {
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
  updateScore();
  return isMoved;
}

function moveDown() {
  let isMoved = false;
  for (let col = 0; col < boardSize; col++) {
    let merged = false;
    for (let row = boardSize - 2; row >= 0; row--) {
      if (board[row][col] !== 0) {
        let i = row;
        for (; i < boardSize - 1 && board[i + 1][col] === 0; i++) {
          board[i + 1][col] = board[i][col];
          board[i][col] = 0;
        }
        if (i < boardSize - 1 && board[i + 1][col] === board[i][col] && !merged) {
          score += board[i + 1][col];
          board[i + 1][col] *= 2;
          board[i][col] = 0;
          merged = true;
        }
        isMoved = true;
      }
    }
  }
  updateScore();
  return isMoved;
}

function moveLeft() {
  let isMoved = false;
  for (let row = 0; row < boardSize; row++) {
    let merged = false;
    for (let col = 1; col < boardSize; col++) {
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
  updateScore();
  return isMoved;
}

function moveRight() {
  let isMoved = false;
  for (let row = 0; row < boardSize; row++) {
    let merged = false;
    for (let col = boardSize - 2; col >= 0; col--) {
      if (board[row][col] !== 0) {
        let j = col;
        for (; j < boardSize - 1 && board[row][j + 1] === 0; j++) {
          board[row][j + 1] = board[row][j];
          board[row][j] = 0;
        }
        if (j < boardSize - 1 && board[row][j + 1] === board[row][j] && !merged) {
          score += board[row][j + 1];
          board[row][j + 1] *= 2;
          board[row][j] = 0;
          merged = true;
        }
        isMoved = true;
      }
    }
  }
  updateScore();
  return isMoved;
}

function updateScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.innerText = score;
}

function spawnRandomTile() {
  const emptyCells = [];
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell.row][randomCell.col] = 2;
  }
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
  }
});

function compareBoards(board1, board2) {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board1[i][j] !== board2[i][j]) {
        return false;
      }
    }
  }
  return true;
}

initializeBoard();
