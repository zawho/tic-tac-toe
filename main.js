// Game board module.
const gameBoard = (() => {
    const board = [];
    let boardCellDiv;
    function createGameBoard() {
        const gameBoardDiv = document.querySelector('.game-board');
        for (let i = 0; i < 9; i++) {
            boardCellDiv = document.createElement('div');
            boardCellDiv.classList.add('.board-cell');
            boardCellDiv.style.border = 'solid 1px black';
            boardCellDiv.style.display = 'flex';
            boardCellDiv.style.justifyContent = 'center';
            boardCellDiv.style.alignItems = 'center';
            gameBoardDiv.appendChild(boardCellDiv);
            board.push(boardCellDiv);
        };
    };
    createGameBoard();
    return {
        board,
        boardCellDiv,
    };
})();

// Player factory function and player variables.
const playerFactory = (playerName, playerSymbol) => {
    function takeTurn() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i].addEventListener('click', () => {
                gameBoard.board[i].innerText = playerSymbol;
            });
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
    let firstPlayer;
    function chooseFirstPlayer() {
        const randNum = Math.floor(Math.random() * 2);
        if (randNum === 0) {
            firstPlayer = playerOne;
        } else {
            firstPlayer = playerTwo;
        }
    }
    chooseFirstPlayer();
})();


