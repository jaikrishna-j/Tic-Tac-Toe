import { beginnerAI, mediumAI, advancedAI } from './bot.js';
const cells = Array.from(document.querySelectorAll('.cell'));
const statusBanner = document.querySelector('#statusBanner');
const restartBtn = document.querySelector('#restartBtn');
const levelChips = document.querySelectorAll('.diff-btn');
const playerToggles = document.querySelectorAll('.player-toggle');
const scoreX = document.querySelector('#scoreX');
const scoreO = document.querySelector('#scoreO');
const scoreDraw = document.querySelector('#scoreDraw');
const arena = document.querySelector('.arena');

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

const strategies = {
    beginner: beginnerAI,
    medium: mediumAI,
    advanced: advancedAI,
};

let board = Array(9).fill(null);
let currentPlayer = 'X';
let humanPlayer = 'X';
let computerPlayer = 'O';
let difficulty = 'beginner';
let locked = false;
let scores = { X: 0, O: 0, draw: 0 };
let confettiTimer;
let introDismissed = false;

const updateStatus = (text) => {
    statusBanner.textContent = text;
};

const updateScoresUI = () => {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
};

const clearBoardUI = () => {
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.dataset.value = '';
        cell.dataset.disabled = 'false';
        cell.classList.remove('marked', 'win');
    });
};

const switchPlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const placeMark = (idx, player) => {
    board[idx] = player;
    const cell = cells[idx];
    cell.textContent = player;
    cell.dataset.value = player;
    cell.classList.add('marked');
};

const evaluateBoard = () => {
    for (const combo of winConditions) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], combo };
        }
    }
    if (board.every(Boolean)) {
        return { winner: null, combo: [] };
    }
    return null;
};

const finishRound = ({ winner, combo }) => {
    locked = true;
    if (winner) {
        scores[winner] += 1;
        updateStatus(`${winner === humanPlayer ? 'You win' : 'Computer wins'} as ${winner}!`);
        combo.forEach((index) => cells[index].classList.add('win'));
        arena?.classList.add('celebrating');
        clearTimeout(confettiTimer);
        confettiTimer = setTimeout(() => {
            arena?.classList.remove('celebrating');
        }, 2000);
    } else {
        scores.draw += 1;
        updateStatus('Draw! Great defense.');
        arena?.classList.remove('celebrating');
    }
    updateScoresUI();
};

const handleComputerMove = () => {
    locked = true;
    updateStatus(`Computer is thinking (${difficulty})...`);
    setTimeout(() => {
        const movePicker = strategies[difficulty];
        const computerIndex = movePicker(board.slice(), computerPlayer, humanPlayer);
        if (computerIndex === undefined || board[computerIndex]) {
            // fallback random
            const avail = board
                .map((val, idx) => (val ? null : idx))
                .filter((val) => val !== null);
            if (avail.length) {
                const randomIdx = avail[Math.floor(Math.random() * avail.length)];
                placeMark(randomIdx, computerPlayer);
            }
        } else {
            placeMark(computerIndex, computerPlayer);
        }
        const evaluation = evaluateBoard();
        if (evaluation) {
            finishRound(evaluation);
            return;
        }
        switchPlayer();
        locked = false;
        updateStatus(`Your move as ${humanPlayer}`);
    }, difficulty === 'advanced' ? 700 : 500);
};

const handleCellClick = (idx) => {
    if (locked || !introDismissed || currentPlayer !== humanPlayer || board[idx]) return;

    placeMark(idx, humanPlayer);
    const evaluation = evaluateBoard();
    if (evaluation) {
        finishRound(evaluation);
        return;
    }
    switchPlayer();
    locked = false;
    updateStatus(`Computer (${difficulty}) is up`);
    if (currentPlayer === computerPlayer) {
        handleComputerMove();
    }
};

const setActiveLevel = (level) => {
    levelChips.forEach((chip) => {
        const isActive = chip.dataset.level === level;
        chip.classList.toggle('active', isActive);
        chip.setAttribute('aria-checked', String(isActive));
    });
    difficulty = level;
};

const setActivePlayer = (player) => {
    playerToggles.forEach((toggle) => {
        const isActive = toggle.dataset.player === player;
        toggle.classList.toggle('active', isActive);
        toggle.setAttribute('aria-pressed', String(isActive));
    });
    humanPlayer = player;
    computerPlayer = humanPlayer === 'X' ? 'O' : 'X';
};

const resetMatch = () => {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    if (!introDismissed) {
        locked = true;
    } else {
        locked = false;
    }
    clearBoardUI();
    arena?.classList.remove('celebrating');
    if (humanPlayer === 'O') {
        currentPlayer = 'X';
        if (introDismissed) {
            locked = true;
            updateStatus('Computer opens as X');
            setTimeout(() => {
                handleComputerMove();
            }, 400);
        }
    } else {
        if (introDismissed) {
            updateStatus('Your move as X');
        }
    }
};

cells.forEach((cell) => {
    const idx = Number(cell.dataset.index);
    cell.addEventListener('click', () => handleCellClick(idx));
});

restartBtn.addEventListener('click', () => {
    resetMatch();
});

levelChips.forEach((chip) => {
    chip.addEventListener('click', () => {
        if (chip.dataset.level === difficulty) return;
        setActiveLevel(chip.dataset.level);
        resetMatch();
    });
});

playerToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        if (toggle.dataset.player === humanPlayer) return;
        setActivePlayer(toggle.dataset.player);
        resetMatch();
    });
});

// Intro screen logic
const introScreen = document.querySelector('#introScreen');
const introStartBtn = document.querySelector('#introStartBtn');

const hideIntro = () => {
    if (introScreen && !introDismissed) {
        introScreen.classList.add('hidden');
        introDismissed = true;
        // Unlock game after intro is dismissed
        if (humanPlayer === 'X') {
            locked = false;
            updateStatus('Your move as X');
        } else {
            // If playing as O, computer will start
            locked = true;
            currentPlayer = 'X';
            updateStatus('Computer opens as X');
            setTimeout(() => {
                handleComputerMove();
            }, 400);
        }
    }
};

if (introStartBtn) {
    introStartBtn.addEventListener('click', () => {
        hideIntro();
    });
}

// Prevent game interaction until intro is dismissed
locked = true;

// Init
setActiveLevel(difficulty);
setActivePlayer(humanPlayer);
resetMatch();
updateScoresUI();