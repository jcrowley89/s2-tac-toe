"use strict";

/// GLOBALS ///

let gameState = ["", "", "", "", "", "", "", "", ""];
const player1Select = document.querySelector("#player1");
const player2Select = document.querySelector("#player2");
const infoDisplay = document.querySelector("#infoDisplay");
const restartBtn = document.querySelector("#restart");
const winningCombos = [
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 4, 8], // Diag 1
  [2, 4, 6], // Diag 2
];

let players = [{}, {}];
let currentPlayer = players[0];
let playersIndices = [];

/// FUNCTIONS ///

function toggleCurrentPlayer() {
  if (currentPlayer === players[0]) {
    return (currentPlayer = players[1]);
  }
  return (currentPlayer = players[0]);
}

function renderGameBoard() {
  const gameBoardSquares = document.querySelectorAll(".square");
  gameState.forEach((item, index) => {
    if (item === "") {
      gameBoardSquares[index].classList.add("active");
    } else {
      gameBoardSquares[index].querySelector("img").src = `img/${players[
        item
      ].name.toLowerCase()}.png`;
    }
  });
  const activeSquares = document.querySelectorAll(".square.active");
  activeSquares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
  });
}

function handleSquareClick(e) {
  const index = parseInt(e.currentTarget.getAttribute("data-square-index"));
  gameState[index] = players.indexOf(currentPlayer);
  init();
  if (checkForWinner()) {
    handleWin();
    return;
  }
  toggleCurrentPlayer();
  infoDisplay.innerText = `${currentPlayer.name}'s turn...`;
}

function checkForWinner() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCombo = winningCombos[i];
    const currentPlayerIndex = players.indexOf(currentPlayer);
    let a = gameState[winCombo[0]];
    let b = gameState[winCombo[1]];
    let c = gameState[winCombo[2]];
    if (
      a === currentPlayerIndex &&
      b === currentPlayerIndex &&
      c === currentPlayerIndex
    ) {
      roundWon = true;
    }
  }
  return roundWon;
}

function handleWin() {
    infoDisplay.innerText = `${currentPlayer.name} Won!`;
}

function init() {
  if (!players[0].name || !players[1].name) {
    return;
  }
  if (player1Select.value === player2Select.value) {
    infoDisplay.innerText = "Players must be different.";
    return;
  }
  infoDisplay.innerText = `${currentPlayer.name}'s turn...`;
  renderGameBoard();
}

/// EVENTS ///

player1Select.addEventListener("change", () => {
  players[0].name = player1Select.value;
  init();
});

player2Select.addEventListener("change", () => {
  players[1].name = player2Select.value;
  init();
});

restartBtn.addEventListener("click", () => {
    window.location.reload();
})