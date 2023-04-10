// Game board module.
const gameBoard = (() => {

    const board = [];
    const startButton = document.querySelector('.start-button');
    const resetButton = document.querySelector('.reset-button');
    let boardCellDiv;
    let gameBoardDiv;

    function createGameBoard() {
        gameBoardDiv = document.querySelector('.game-board');
        for (let i = 0; i < 9; i++) {
            boardCellDiv = document.createElement('div');
            boardCellDiv.classList.add('.board-cell');
            boardCellDiv.setAttribute('id', `cell-${i}`);
            boardCellDiv.style.border = 'solid 0.5px black';
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
        startButton,
        resetButton
    };

})();

// Player factory function and player variables.
const playerFactory = (playerName, playerSymbol) => {

    const player1NameInput = document.querySelector('.player-1-name');
    const player2NameInput = document.querySelector('.player-2-name');
    const player1NameLabel = document.querySelector('.player-1-label');
    const player2NameLabel = document.querySelector('.player-2-label');
    let currentPlayer;

    return {
        playerName,
        playerSymbol,
        player1NameInput,
        player2NameInput,
        player1NameLabel,
        player2NameLabel,
        currentPlayer
    }
    
};

const playerOne = playerFactory();
const playerTwo = playerFactory();

// Game flow module.
const gameFlow = (() => {

    const gameMsgDiv = document.querySelector('.game-msg');
    const winMsgDiv = document.querySelector('.win-msg');
    const alertMsgDiv = document.querySelector('.alert-msg');
    const playerOneXButton = document.getElementById('player-1-x');
    const playerOneOButton = document.getElementById('player-1-o');
    const playerTwoXButton = document.getElementById('player-2-x');
    const playerTwoOButton = document.getElementById('player-2-o');
    const P1XLabel = document.getElementById('1-x-label');
    const P1OLabel = document.getElementById('1-o-label');
    const P2XLabel = document.getElementById('2-x-label');
    const P2OLabel = document.getElementById('2-o-label');

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
            if (item.every((x) => x === playerOne.playerSymbol)) {
                gameMsgDiv.style.display = 'none';
                winMsgDiv.style.display = 'block';
                winMsgDiv.innerText = `${playerOne.playerName} wins!`;
                gameBoard.gameBoardDiv.style.pointerEvents = 'none';
            } else if (item.every((x) => x === playerTwo.playerSymbol)) {
                gameMsgDiv.style.display = 'none';
                winMsgDiv.style.display = 'block';
                winMsgDiv.innerText = `${playerTwo.playerName} wins!`;
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
                    gameMsgDiv.innerText = `${playerTwo.playerName}'s turn!`;
                } else {
                    playerFactory.currentPlayer = playerOne;
                    gameMsgDiv.innerText = `${playerOne.playerName}'s turn!`;
                }
                if (!(document.getElementById(`cell-${i}`).innerText === '')) {
                    document.getElementById(`cell-${i}`).style.pointerEvents = 'none';
                }
                if (gameBoard.board.every((y) => y === 'X' || y === 'O') && !(gameBoard.gameBoardDiv.style.pointerEvents === 'none')) {
                    gameMsgDiv.innerText = 'Tie!';
                }
            });
        }
    }

    function chooseFirstPlayer() {
        const randNum = Math.floor(Math.random() * 2);
        if (randNum === 0) {
            playerFactory.currentPlayer = playerOne;
            gameMsgDiv.innerText = `${playerOne.playerName}'s turn!`;
        } else {
            playerFactory.currentPlayer = playerTwo;
            gameMsgDiv.innerText = `${playerTwo.playerName}'s turn!`;
        }
    }

    function playGame() {
        playerOne.player1NameLabel.style.display = 'none';
        playerTwo.player2NameLabel.style.display = 'none';
        playerOne.player1NameInput.style.display = 'none';
        playerTwo.player2NameInput.style.display = 'none';
        playerOneXButton.style.display = 'none';
        playerOneOButton.style.display = 'none';
        playerTwoXButton.style.display = 'none';
        playerTwoOButton.style.display = 'none';
        P1XLabel.style.display = 'none';
        P1OLabel.style.display = 'none';
        P2XLabel.style.display = 'none';
        P2OLabel.style.display = 'none';
        gameBoard.startButton.style.display = 'none';
        alertMsgDiv.style.display = 'none';
        gameMsgDiv.style.display = 'block';
        gameBoard.resetButton.style.display = 'block';
        chooseFirstPlayer();
        takeTurn();
    }

    function startGame() {
        if (playerOne.player1NameInput.value === '') {
            playerOne.playerName = 'Player 1';
        } else {
            playerOne.playerName = playerOne.player1NameInput.value;
        }
        if (playerTwo.player2NameInput.value === '') {
            playerTwo.playerName = 'Player 2';
        } else {
            playerTwo.playerName = playerTwo.player2NameInput.value;
        }
        if (playerOneXButton.checked && playerTwoOButton.checked) {
            playerOne.playerSymbol = 'X';
            playerTwo.playerSymbol = 'O';
            playGame();
        } else if (playerOneOButton.checked && playerTwoXButton.checked) {
            playerOne.playerSymbol = 'O';
            playerTwo.playerSymbol = 'X';
            playGame();
        } else {
            alertMsgDiv.innerText = 'Each player must select their own symbol!';
        }
    }

    function resetGame() {
        document.location.reload();
    }

    return {
        takeTurn,
        startGame,
        resetGame
    };

})();

gameBoard.startButton.addEventListener('click', gameFlow.startGame);
gameBoard.resetButton.addEventListener('click', gameFlow.resetGame);


