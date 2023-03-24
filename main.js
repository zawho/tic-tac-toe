// Game board module.
const gameBoard = (() => {

    const board = [];
    let boardCellDiv;

    function createGameBoard() {
        const gameBoardDiv = document.querySelector('.game-board');
        for (let i = 0; i < 9; i++) {
            boardCellDiv = document.createElement('div');
            boardCellDiv.classList.add('.board-cell');
            boardCellDiv.setAttribute('id', `cell-${i}`);
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

    let currentPlayer;

    return {
        playerName,
        playerSymbol,
        currentPlayer
    }
    
};

const playerOne = playerFactory('Player 1', 'X');
const playerTwo = playerFactory('Player 2', 'O');

// Game flow module.
const gameFlow = (() => {

    const testArr = [];
    const otherArr = [];
    const winArr = [
        '012',
        '345',
        '678',
        '036',
        '147',
        '258',
        '048',
        '246',
    ];

    function getWinner() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            testArr.push(Array.from([i, i + 1, i + 2]).toString().replaceAll(',', ''));
            testArr.push(Array.from([i, i + 2, i + 4]).toString().replaceAll(',', ''));
            testArr.push(Array.from([i, i + 3, i + 6]).toString().replaceAll(',', ''));
            testArr.push(Array.from([i, i + 4, i + 8]).toString().replaceAll(',', ''));
        }
        for (let i = 0; i < testArr.length; i++) {
            if (winArr.includes(testArr[i])) {
                otherArr.push(testArr[i]);
            }
        }
        console.log(otherArr);
    }

    getWinner();

    function takeTurn() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i].addEventListener('click', () => {
                gameBoard.board[i].innerText = playerFactory.currentPlayer.playerSymbol;
                gameBoard.board[i] = playerFactory.currentPlayer.playerSymbol;
                getWinner();
                if (playerFactory.currentPlayer === playerOne) {
                    playerFactory.currentPlayer = playerTwo;
                } else {
                    playerFactory.currentPlayer = playerOne;
                }
                if (!(document.getElementById(`cell-${i}`).innerText === '')) {
                    document.getElementById(`cell-${i}`).style.pointerEvents = 'none';
                }
            });
        }
    }

    function chooseFirstPlayer() {
        const randNum = Math.floor(Math.random() * 2);
        if (randNum === 0) {
            playerFactory.currentPlayer = playerOne;
        } else {
            playerFactory.currentPlayer = playerTwo;
        }
    }

    function playGame() {
        chooseFirstPlayer();
        console.log(playerFactory.currentPlayer.playerName);
        takeTurn();
    }

    return {
        takeTurn,
        playGame
    };

})();

gameFlow.playGame();


