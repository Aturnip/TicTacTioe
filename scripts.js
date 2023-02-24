// players object
const player = (name, sign) => {
    this.board = [];
    return {name, sign, board};
};

const player1 = player("Admin", "X");
const player2 = player("Computer", "O");

// creating a gameboard module - I need just one of it
const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    let currentPlayer = player1;

    const winningPattern = [
        [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,3,6]
    ];

    const switchTurns = () => {
        currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        document.querySelector("#turnDisplay").textContent = `${currentPlayer.name} turn`;
    }

    const display = () => {
        for (i=0; i<board.length; i++) {
            document.querySelector(`#tile${i}`).textContent = board[i];
        }
    }

    const playerScoreUpd = (id) => {
        currentPlayer.board.push(id);
        for (const pattern of winningPattern) {
            if (currentPlayer.board.includes(pattern[0]) && currentPlayer.board.includes(pattern[1]) && currentPlayer.board.includes(pattern[2])) {
                alert(`${currentPlayer.name} WINS!!!`);
            }
        }
    }

    // update boardu po klinieciu
    const boardUpdate = (id, sign) => {
        if (board[id] === "") {
            board[id] = sign;
            display();
            playerScoreUpd(id);
            switchTurns();
        }
    }

    // event listener
    document.querySelectorAll(".tile").forEach((tile) => {
        tile.addEventListener("click", (e) => {
            boardUpdate(Number(e.target.id.slice(-1)), currentPlayer.sign); 
        })
    });

    document.querySelector("button").addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        player1.board = [];
        player2.board = [];
        currentPlayer = player2;
        switchTurns();
        display();
    });

    return {};

}) ();

