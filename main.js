// Game board module.
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = i;
        for (let j = 0; j < columns; j++) {
            board[j] = j;
        }
    };
    return {
        board
    };
})();

console.log(gameBoard.board);