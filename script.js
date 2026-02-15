const gridContainer = document.getElementById('grid-container');
const scoreElement = document.getElementById('score');

let grid = [];
let score = 0;
let history = [];
let leaderboard = [];

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
    saveState();
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
    saveState();
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
    saveState();
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
    saveState();
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
    history = [];
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

function saveLeaderboard() {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function addLeaderboardEntry(name, score) {
    const entry = {
        name: name,
        score: score,
        date: new Date().toLocaleDateString('ru-RU')
    };
    
    leaderboard.push(entry);
    
    leaderboard.sort((a, b) => b.score - a.score);
    
    if (leaderboard.length > 10) {
        leaderboard = leaderboard.slice(0, 10);
    }
    
    saveLeaderboard();
    displayLeaderboard();
}

function displayLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';
    
    leaderboard.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.score}</td>
            <td>${entry.date}</td>
        `;
        tbody.appendChild(row);
    });
}

function saveState() {
    const state = {
        grid: grid.map(row => [...row]),
        score: score
    };
    history.push(state);
    if (history.length > 10) {
        history.shift();
    }
}

function undo() {
    if (document.getElementById('game-over-modal').style.display === 'block') {
        return;
    }
    if (history.length === 0) return;
    
    const prevState = history.pop();
    grid = prevState.grid.map(row => [...row]);
    score = prevState.score;
    scoreElement.textContent = score;
    updateDisplay();
    saveGame(); 
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

function loadLeaderboard() {
    const savedLeaderboard = localStorage.getItem('leaderboard');
    if (savedLeaderboard) {
        leaderboard = JSON.parse(savedLeaderboard);
    } else {
        leaderboard = [];
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
    loadLeaderboard();
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
    document.getElementById('undo-btn').addEventListener('click', undo);

    document.getElementById('save-score-btn').addEventListener('click', function() {
        const playerName = document.getElementById('player-name').value;
        if (playerName.trim() !== '') {
            addLeaderboardEntry(playerName, score);
            document.getElementById('game-over-modal').style.display = 'none';
            document.getElementById('player-name').value = '';
        }
    });
    
    document.getElementById('restart-from-modal-btn').addEventListener('click', function() {
        document.getElementById('game-over-modal').style.display = 'none';
        newGame();
    });
    
    document.getElementById('show-leaderboard-btn').addEventListener('click', function() {
        displayLeaderboard();
        document.getElementById('leaderboard-modal').style.display = 'block';
    });
    
    document.getElementById('close-leaderboard-btn').addEventListener('click', function() {
        document.getElementById('leaderboard-modal').style.display = 'none';
    });

        document.querySelectorAll('.control-btn').forEach(button => {
        button.addEventListener('click', function() {
            const direction = this.getAttribute('data-direction');
            switch(direction) {
                case 'up':
                    moveUp();
                    break;
                case 'down':
                    moveDown();
                    break;
                case 'left':
                    moveLeft();
                    break;
                case 'right':
                    moveRight();
                    break;
            }
        });
    });
}

startGame();