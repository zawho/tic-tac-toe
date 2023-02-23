const gameBoardDiv = document.querySelector('.game-board');

// Game board module.
const gameBoard = (() => {
    const boardCell = 9;
    const board = [];
    function createGameBoard() {
        for (let i = 0; i < boardCell; i++) {
            const boardCellDiv = document.createElement('div');
            boardCellDiv.style.border = 'solid 1px black';
            boardCellDiv.style.display = 'flex';
            boardCellDiv.style.justifyContent = 'center';
            boardCellDiv.style.alignItems = 'center';
            gameBoardDiv.appendChild(boardCellDiv);g
        };
    };
    createGameBoard();
    return {
        board
    };
})();

// Player factory function and player variables.
const playerFactory = (playerName, playerSymbol) => {
    function takeTurn() {

    }
    return {
        playerName,
        playerSymbol
    }
};

const playerOne = playerFactory('Player 1', 'X');
const playerTwo = playerFactory('Player 2', 'O');

// Game flow module.
const gameFlow = (() => {

})();


