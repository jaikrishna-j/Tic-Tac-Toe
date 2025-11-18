const getEmptyIndices = (board) =>
    board.map((cell, idx) => (cell ? null : idx)).filter((idx) => idx !== null);

export const beginnerAI = (board) => {
    const available = getEmptyIndices(board);
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
};

const findWinningMove = (board, player) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (const combo of winPatterns) {
        const [a, b, c] = combo;
        const values = [board[a], board[b], board[c]];
        if (values.filter((val) => val === player).length === 2 &&
            values.includes(null)) {
            return combo[values.indexOf(null)];
        }
    }
    return null;
};

export const mediumAI = (board, computerPlayer, humanPlayer) => {
    // Win if possible
    const winningMove = findWinningMove(board, computerPlayer);
    if (winningMove !== null) return winningMove;

    // Block opponent
    const blockMove = findWinningMove(board, humanPlayer);
    if (blockMove !== null) return blockMove;

    // Take center
    if (!board[4]) return 4;

    // Take a corner
    const corners = [0, 2, 6, 8].filter((idx) => !board[idx]);
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

    // Fallback to random
    return beginnerAI(board);
};

const minimax = (board, depth, isMaximizing, computerPlayer, humanPlayer) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    const evaluate = () => {
        for (const [a, b, c] of winPatterns) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                if (board[a] === computerPlayer) return 10 - depth;
                if (board[a] === humanPlayer) return depth - 10;
            }
        }
        if (board.every(Boolean)) return 0;
        return null;
    };

    const score = evaluate();
    if (score !== null) return score;

    const moves = getEmptyIndices(board);

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (const idx of moves) {
            board[idx] = computerPlayer;
            const value = minimax(board, depth + 1, false, computerPlayer, humanPlayer);
            board[idx] = null;
            bestScore = Math.max(bestScore, value);
        }
        return bestScore;
    }

    let bestScore = Infinity;
    for (const idx of moves) {
        board[idx] = humanPlayer;
        const value = minimax(board, depth + 1, true, computerPlayer, humanPlayer);
        board[idx] = null;
        bestScore = Math.min(bestScore, value);
    }
    return bestScore;
};

export const advancedAI = (board, computerPlayer, humanPlayer) => {
    let bestScore = -Infinity;
    let bestMove;
    const moves = getEmptyIndices(board);

    for (const idx of moves) {
        board[idx] = computerPlayer;
        const score = minimax(board, 0, false, computerPlayer, humanPlayer);
        board[idx] = null;

        if (score > bestScore) {
            bestScore = score;
            bestMove = idx;
        }
    }
    return bestMove ?? beginnerAI(board);
};

