// Game board module.
const gameBoard = (() => {

    const board = [];
    let boardCellDiv;
    let gameBoardDiv;

    function createGameBoard() {
        gameBoardDiv = document.querySelector('.game-board');
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
        gameBoardDiv,
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

    const winTestArr1 = [];
    const winTestArr2 = [];
    const winCheckArr = [
        '012',
        '345',
        '678',
        '036',
        '147',
        '258',
        '048',
        '246',
    ];

    function getWinNum() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            winTestArr1.push(Array.from([i, i + 1, i + 2]));
            winTestArr1.push(Array.from([i, i + 2, i + 4]));
            winTestArr1.push(Array.from([i, i + 3, i + 6]));
            winTestArr1.push(Array.from([i, i + 4, i + 8]));
        }
        for (let i = 0; i < winTestArr1.length; i++) {
            if (winCheckArr.includes(winTestArr1[i].toString().replaceAll(',', ''))) {
                winTestArr2.push(winTestArr1[i]);
            }
        }
    }

    getWinNum();

    function getWinner(cellIndex) {
        winTestArr2.forEach((item) => {
            for (let i = 0; i < item.length; i++) {
                if (cellIndex === item[i]) {
                    item[i] = gameBoard.board[cellIndex]; // eslint-disable-line no-param-reassign
                }
            }
            if (item.every((x) => x === 'X')) {
                console.log('Player 1 wins!');
                gameBoard.gameBoardDiv.style.pointerEvents = 'none';
            } else if (item.every((x) => x === 'O')) {
                console.log('Player 2 wins!');
                gameBoard.gameBoardDiv.style.pointerEvents = 'none';
            }
        })
    }

    function takeTurn() {
        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBoard.board[i].addEventListener('click', () => {
                gameBoard.board[i].innerText = playerFactory.currentPlayer.playerSymbol;
                gameBoard.board[i] = playerFactory.currentPlayer.playerSymbol;
                getWinner(i);
                if (playerFactory.currentPlayer === playerOne) {
                    playerFactory.currentPlayer = playerTwo;
                } else {
                    playerFactory.currentPlayer = playerOne;
                }
                if (!(document.getElementById(`cell-${i}`).innerText === '')) {
                    document.getElementById(`cell-${i}`).style.pointerEvents = 'none';
                }
                if (gameBoard.board.every((y) => y === 'X' || y === 'O') && !(gameBoard.gameBoardDiv.style.pointerEvents === 'none')) {
                    console.log('Tie!');
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


