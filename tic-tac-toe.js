// step 1: x for player1, o for player2
// step 2: does the click cause a player to win?
// step 3: end game phase and reset

const BOARD_WIDTH = 3;
let currentPlayer = 1;
let numMovesDone = 0;
let boardState = generateEmptyBoardState();

const gameHeading = document.getElementById("game-heading");
const gameSquares = document.querySelectorAll(".game-square");
const restartButton = document.getElementById("restart-button");

restartButton.addEventListener("click", restartGame);

gameSquares.forEach((gameSquare, i) => {
  gameSquare.addEventListener("click", (e) => {
    const row = Math.floor(i / BOARD_WIDTH);
    const column = i % BOARD_WIDTH;
    makeMove(gameSquare, row, column);
  });
});

function makeMove(gameSquare, row, col) {
  gameSquare.textContent = currentPlayer === 1 ? "X" : "O";
  gameSquare.disabled = true;
  numMovesDone++;
  boardState[row][col] = currentPlayer;

  if (didPlayerWin(currentPlayer)) {
    gameHeading.textContent = `Player ${currentPlayer} Won!`;
    endGame();
  } else if (numMovesDone >= BOARD_WIDTH * BOARD_WIDTH) {
    gameHeading.textContent = "Tie Game!";
    endGame();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeader();
  }
}

function setCurrentPlayerHeader() {
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}

function didPlayerWin(currentPlayer) {
  const rows = [0, 1, 2];
  const wonHorizontal = rows.some((row) => {
    return (
      boardState[row][0] === currentPlayer &&
      boardState[row][1] === currentPlayer &&
      boardState[row][2] === currentPlayer
    );
  });

  const columns = [0, 1, 2];
  const wonVertical = columns.some((col) => {
    return (
      boardState[0][col] === currentPlayer &&
      boardState[1][col] === currentPlayer &&
      boardState[2][col] === currentPlayer
    );
  });

  const wonTopLeftToBottomRight =
    boardState[0][0] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][2] === currentPlayer;
  const wonTopRightToBottomLeft =
    boardState[0][2] === currentPlayer &&
    boardState[1][1] === currentPlayer &&
    boardState[2][0] === currentPlayer;

  return (
    wonHorizontal ||
    wonVertical ||
    wonTopLeftToBottomRight ||
    wonTopRightToBottomLeft
  );
}

function endGame() {
  restartButton.style.display = "block";
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = true;
  });
}

//generate 3x3 array
function generateEmptyBoardState() {
  return new Array(BOARD_WIDTH).fill().map(() => new Array(BOARD_WIDTH).fill());
}

function restartGame() {
  boardState = generateEmptyBoardState();
  currentPlayer = 1;
  numMovesDone = 0;
  setCurrentPlayerHeader();
  gameSquares.forEach((gameSquare) => {
    gameSquare.textContent = "";
    gameSquare.disabled = false;
  });
  restartButton.style.display = "none";
}
