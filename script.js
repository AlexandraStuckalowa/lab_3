const gridContainer = document.getElementById('grid-container');
const scoreElement = document.getElementById('score');

let grid = [];
let score = 0;

function createGrid() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        gridContainer.appendChild(cell);
    }
}

function initializeGrid() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    scoreElement.textContent = score;
}

function addRandomTile() {
    const emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({row, col});
            }
        }
    }
    
    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const value = Math.random() < 0.9 ? 2 : 4;
        grid[randomCell.row][randomCell.col] = value;
    }
}

function updateDisplay() {
    const cells = document.querySelectorAll('.cell');
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const index = row * 4 + col;
            const value = grid[row][col];
            cells[index].textContent = value === 0 ? '' : value;
        }
    }
}

function startGame() {
    initializeGrid();
    addRandomTile();
    addRandomTile();
    updateDisplay();
}

createGrid();
startGame();