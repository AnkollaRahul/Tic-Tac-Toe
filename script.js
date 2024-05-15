const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartButton = document.getElementById('restart-button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    status.classList.add('win-message');
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    status.textContent = `It's a draw!`;
    status.classList.add('tie-message');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winConditions.some(condition => {
    return condition.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function checkDraw() {
  return gameState.every(cell => {
    return cell !== '';
  });
}

function handleRestart() {
  currentPlayer = 'X';
  gameActive = true;
  gameState = ['', '', '', '', '', '', '', '', ''];
  status.textContent = `Player ${currentPlayer}'s turn`;
  status.classList.remove('win-message', 'tie-message');
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', handleRestart);