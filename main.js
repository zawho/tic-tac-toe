// Game board module.
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];
    function createGameBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[j] = j;
            }
        };
    };
    createGameBoard();
    return {
        board
    };
})();

console.log(gameBoard.board);