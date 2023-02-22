const gameBoardDiv = document.querySelector('.game-board');

// Game board module.
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];
    function createGameBoard() {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            const boardRow = document.createElement('div');
            boardRow.style.display = 'flex';
            gameBoardDiv.appendChild(boardRow);
            for (let j = 0; j < columns; j++) {
                board[j] = i;
                const boardCell = document.createElement('div');
                boardCell.style.width = '30px';
                boardCell.style.height = '30px';
                boardCell.style.border = 'solid 1px black';
                boardCell.style.display = 'flex';
                boardCell.style.justifyContent = 'center';
                boardCell.style.alignItems = 'center';
                boardCell.innerText = board[j];
                boardRow.appendChild(boardCell);
            }
        };
    };
    createGameBoard();
    return {
        board
    };
})();

// Player factory function and player variables.
const playerFactory = (playerName) => ({playerName});

const playerOne = playerFactory('Player 1');
const playerTwo = playerFactory('Player 2');

// Game flow module.
const gameFlow = (() => {

})();


