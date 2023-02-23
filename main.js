const gameBoardDiv = document.querySelector('.game-board');

// Game board module.
const gameBoard = (() => {
    const board = [];
    let boardCellDiv;
    function createGameBoard() {
        for (let i = 0; i < 9; i++) {
            boardCellDiv = document.createElement('div');
            boardCellDiv.style.border = 'solid 1px black';
            boardCellDiv.style.display = 'flex';
            boardCellDiv.style.justifyContent = 'center';
            boardCellDiv.style.alignItems = 'center';
            gameBoardDiv.appendChild(boardCellDiv);
            board.push(boardCellDiv);
        };
        console.log(board);
    };
    createGameBoard();
    return {
        board,
        boardCellDiv
    };
})();

// Player factory function and player variables.
const playerFactory = (playerName, playerSymbol) => {
    function takeTurn() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i].innerText = 'X';
        }
    }
    return {
        playerName,
        playerSymbol,
        takeTurn
    }
};

const playerOne = playerFactory('Player 1', 'X');
playerOne.takeTurn();
const playerTwo = playerFactory('Player 2', 'O');

// Game flow module.
const gameFlow = (() => {

})();


