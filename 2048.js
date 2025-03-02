const boardSize = 4;
let board;
let score = 0;
let gameStarted = false;
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const initializeGame = () => {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    score = 0;
    updateScore();
    addRandomTile();
    addRandomTile();
    renderBoard();
}

const addRandomTile = () => {
    const emptyTiles = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0)
                emptyTiles.push({ r, c });
        }
    }
    if (emptyTiles.length > 0) {
        const { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

const renderBoard = (direction, movedTiles = []) => {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.style.setProperty('--grid-size', boardSize);
    
    board.forEach((row, r) => {
        row.forEach((value, c) => {
            const tile = document.createElement('div');
            tile.className = `tile tile-${value}`;
            tile.textContent = value > 0 ? value : '';
            
            const wasMoved = movedTiles.some(move => 
                move.to.r === r && move.to.c === c
            );
            
            if (value !== 0) {
                if (board[r][c] === value * 2) {
                    tile.classList.add('tile-merge');
                } else if (wasMoved) {
                    switch (direction) {
                        case 'ArrowUp':
                            tile.classList.add('tile-move-up');
                            break;
                        case 'ArrowDown':
                            tile.classList.add('tile-move-down');
                            break;
                        case 'ArrowLeft':
                            tile.classList.add('tile-move-left');
                            break;
                        case 'ArrowRight':
                            tile.classList.add('tile-move-right');
                            break;
                    }
                }
            }
            
            gameBoard.appendChild(tile);
        });
    });
}

const updateScore = () => document.getElementById('score').textContent = score;

const move = (direction) => {
    let moved = false;
    const oldBoard = JSON.parse(JSON.stringify(board));
    const movedTiles = [];
    const mergedTiles = [];
    
    switch (direction) {
        case 'ArrowUp':
            for (let c = 0; c < boardSize; c++) {
                for (let r = 1; r < boardSize; r++) {
                    if (board[r][c] !== 0) {
                        let newR = r;
                        while (newR > 0 && board[newR - 1][c] === 0) {
                            board[newR - 1][c] = board[newR][c];
                            board[newR][c] = 0;
                            movedTiles.push({ from: { r, c }, to: { r: newR - 1, c } });
                            newR--;
                            moved = true;
                        }
                        if (newR > 0 && board[newR - 1][c] === board[newR][c]) {
                            board[newR - 1][c] *= 2;
                            score += board[newR - 1][c];
                            board[newR][c] = 0;
                            mergedTiles.push({ r: newR - 1, c });
                            moved = true;
                        }
                    }
                }
            }
            break;
        case 'ArrowDown':
            for (let c = 0; c < boardSize; c++) {
                for (let r = boardSize - 2; r >= 0; r--) {
                    if (board[r][c] !== 0) {
                        let newR = r;
                        while (newR < boardSize - 1 && board[newR + 1][c] === 0) {
                            board[newR + 1][c] = board[newR][c];
                            board[newR][c] = 0;
                            movedTiles.push({ from: { r, c }, to: { r: newR + 1, c } });
                            newR++;
                            moved = true;
                        }
                        if (newR < boardSize - 1 && board[newR + 1][c] === board[newR][c]) {
                            board[newR + 1][c] *= 2;
                            score += board[newR + 1][c];
                            board[newR][c] = 0;
                            mergedTiles.push({ r: newR + 1, c });
                            moved = true;
                        }
                    }
                }
            }
            break;
        case 'ArrowLeft':
            for (let r = 0; r < boardSize; r++) {
                for (let c = 1; c < boardSize; c++) {
                    if (board[r][c] !== 0) {
                        let newC = c;
                        while (newC > 0 && board[r][newC - 1] === 0) {
                            board[r][newC - 1] = board[r][newC];
                            board[r][newC] = 0;
                            movedTiles.push({ from: { r, c }, to: { r, c: newC - 1 } });
                            newC--;
                            moved = true;
                        }
                        if (newC > 0 && board[r][newC - 1] === board[r][newC]) {
                            board[r][newC - 1] *= 2;
                            score += board[r][newC - 1];
                            board[r][newC] = 0;
                            mergedTiles.push({ r, c: newC - 1 });
                            moved = true;
                        }
                    }
                }
            }
            break;
        case 'ArrowRight':
            for (let r = 0; r < boardSize; r++) {
                for (let c = boardSize - 2; c >= 0; c--) {
                    if (board[r][c] !== 0) {
                        let newC = c;
                        while (newC < boardSize - 1 && board[r][newC + 1] === 0) {
                            board[r][newC + 1] = board[r][newC];
                            board[r][newC] = 0;
                            movedTiles.push({ from: { r, c }, to: { r, c: newC + 1 } });
                            newC++;
                            moved = true;
                        }
                        if (newC < boardSize - 1 && board[r][newC + 1] === board[r][newC]) {
                            board[r][newC + 1] *= 2;
                            score += board[r][newC + 1];
                            board[r][newC] = 0;
                            mergedTiles.push({ r, c: newC + 1 });
                            moved = true;
                        }
                    }
                }
            }
            break;
    }
    
    if (moved) {
        addRandomTile();
        renderBoard(direction, movedTiles);
        updateScore();
        if (isGameOver())
            setTimeout(showGameOverDialog, 100);
    }
}

const isGameOver = () => {
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0)
                return false;
            if (r < boardSize - 1 && board[r][c] === board[r + 1][c])
                return false;
            if (c < boardSize - 1 && board[r][c] === board[r][c + 1])
                return false;
        }
    }
    return true;
}

const showGameOverDialog = () => {
    document.getElementById('final-score').textContent = score;
    document.getElementById('game-over-dialog').style.display = 'flex';
}

const hideGameOverDialog = () => {
    document.getElementById('game-over-dialog').style.display = 'none';
}

const startGame = () => {
    gameStarted = true;
    document.getElementById('start-game').textContent = 'Cancel';
    document.getElementById('start-game').disabled = false;
    document.getElementById('restart').disabled = false;
    initializeGame();
}

const cancelGame = () => {
    gameStarted = false;
    document.getElementById('start-game').textContent = 'Start';
    document.getElementById('restart').disabled = true;
}

const preventScroll = (e) => {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
    }
}

const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

const handleTouchMove = (e) => {
    e.preventDefault();
    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;
}

const handleTouchEnd = () => {
    if (!gameStarted) return;

    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 30;

    if (Math.max(absDx, absDy) < minSwipeDistance) return;

    if (absDx > absDy) {
        if (dx > 0) {
            move('ArrowRight');
        } else {
            move('ArrowLeft');
        }
    } else {
        if (dy > 0) {
            move('ArrowDown');
        } else {
            move('ArrowUp');
        }
    }
}

document.addEventListener('DOMContentLoaded', initializeGame);
document.getElementById('restart').addEventListener('click', initializeGame);
document.getElementById('start-game').addEventListener('click', () => {
    if (gameStarted) {
        cancelGame();
    } else {
        startGame();
    }
});
document.getElementById('play-again').addEventListener('click', () => {
    hideGameOverDialog();
    startGame();
});

document.addEventListener('keydown', (e) => {
    if (gameStarted && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        move(e.key);
    }
    preventScroll(e);
});

const gameContainer = document.querySelector('.game-container');
gameContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
gameContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
gameContainer.addEventListener('touchend', handleTouchEnd);
