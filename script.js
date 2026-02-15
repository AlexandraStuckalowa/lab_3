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
            cells[index].setAttribute('data-value', value);
        }
    }
}

function moveLeft() {
    let moved = false;
    let addedScore = 0;
    
    for (let row = 0; row < 4; row++) {
        let newRow = [];
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] !== 0) {
                newRow.push(grid[row][col]);
            }
        }
        
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                addedScore += newRow[i];
                newRow.splice(i + 1, 1);
            }
        }
        
        while (newRow.length < 4) {
            newRow.push(0);
        }
        
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] !== newRow[col]) {
                moved = true;
            }
            grid[row][col] = newRow[col];
        }
    }
    
    if (moved) {
        score += addedScore;
        scoreElement.textContent = score;
        addRandomTile();
        updateDisplay();
        saveGame();

        if (isGameOver()) {
            document.getElementById('game-over-modal').style.display = 'block';
        }
    }
}
function moveRight() {
    let moved = false;
    let addedScore = 0;
    
    for (let row = 0; row < 4; row++) {
        let newRow = [];
        for (let col = 3; col >= 0; col--) {
            if (grid[row][col] !== 0) {
                newRow.push(grid[row][col]);
            }
        }
        
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                addedScore += newRow[i];
                newRow.splice(i + 1, 1);
            }
        }
        
        while (newRow.length < 4) {
            newRow.push(0);
        }
        
        newRow.reverse();
        
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] !== newRow[col]) {
                moved = true;
            }
            grid[row][col] = newRow[col];
        }
    }
    
    if (moved) {
        score += addedScore;
        scoreElement.textContent = score;
        addRandomTile();
        updateDisplay();
        saveGame();

        if (isGameOver()) {
            document.getElementById('game-over-modal').style.display = 'block';
        }
    }
}

function moveUp() {
    let moved = false;
    let addedScore = 0;
    
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== 0) {
                newCol.push(grid[row][col]);
            }
        }
        
        for (let i = 0; i < newCol.length - 1; i++) {
            if (newCol[i] === newCol[i + 1]) {
                newCol[i] *= 2;
                addedScore += newCol[i];
                newCol.splice(i + 1, 1);
            }
        }
        
        while (newCol.length < 4) {
            newCol.push(0);
        }
        
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== newCol[row]) {
                moved = true;
            }
            grid[row][col] = newCol[row];
        }
    }
    
    if (moved) {
        score += addedScore;
        scoreElement.textContent = score;
        addRandomTile();
        updateDisplay();
        saveGame();

        if (isGameOver()) {
            document.getElementById('game-over-modal').style.display = 'block';
        }
    }
}

function moveDown() {
    let moved = false;
    let addedScore = 0;
    
    for (let col = 0; col < 4; col++) {
        let newCol = [];
        for (let row = 3; row >= 0; row--) {
            if (grid[row][col] !== 0) {
                newCol.push(grid[row][col]);
            }
        }
        
        for (let i = 0; i < newCol.length - 1; i++) {
            if (newCol[i] === newCol[i + 1]) {
                newCol[i] *= 2;
                addedScore += newCol[i];
                newCol.splice(i + 1, 1);
            }
        }
        
        while (newCol.length < 4) {
            newCol.push(0);
        }
        
        newCol.reverse();
        
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== newCol[row]) {
                moved = true;
            }
            grid[row][col] = newCol[row];
        }
    }
    
    if (moved) {
        score += addedScore;
        scoreElement.textContent = score;
        addRandomTile();
        updateDisplay();
        saveGame();

        if (isGameOver()) {
            document.getElementById('game-over-modal').style.display = 'block';
        }
    }
}

function isGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                return false;
            }
        }
    }
    
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[row][col] === grid[row][col + 1]) {
                return false;
            }
        }
    }
    
    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (grid[row][col] === grid[row + 1][col]) {
                return false;
            }
        }
    }
    
    return true;
}

function newGame() {
    initializeGrid();
    addRandomTile();
    addRandomTile();
    updateDisplay();
    saveGame();
    document.getElementById('game-over-modal').style.display = 'none';
}

function saveGame() {
    const gameState = {
        grid: grid,
        score: score
    };
    localStorage.setItem('game2048', JSON.stringify(gameState));
}

function loadGame() {
    const savedGame = localStorage.getItem('game2048');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        grid = gameState.grid;
        score = gameState.score;
        scoreElement.textContent = score;
        updateDisplay();
    }
}

function handleKeyPress(event) {
    switch(event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            moveLeft();
            break;
        case 'ArrowRight':
            event.preventDefault();
            moveRight();
            break;
        case 'ArrowUp':
            event.preventDefault();
            moveUp();
            break;
        case 'ArrowDown':
            event.preventDefault();
            moveDown();
            break;
    }
}

function startGame() {
    createGrid();
    
    const savedGame = localStorage.getItem('game2048');
    if (savedGame) {
        loadGame();
    } else {
        initializeGrid();
        addRandomTile();
        addRandomTile();
        updateDisplay();
        saveGame();
    }
    
    document.addEventListener('keydown', handleKeyPress);
    document.getElementById('new-game-btn').addEventListener('click', newGame);
}

startGame();