// players object
const player = (name, sign) => {
  this.board = [];
  return { name, sign, board };
};

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");
const computerPlayer = player("Computer", "O");

// selecting players
const playersSelect = (() => {
  const pVP = document.querySelector(".navbar_pvp_button");
  const pVC = document.querySelector(".navbar_pvc_button");

  pVP.classList.add("clicked");
  let currentPlayers = [player1, player2];
  
  pVP.addEventListener("click", () => {
    if (currentPlayers[1] === computerPlayer) currentPlayers = [player1, player2];
    pVP.classList.add("clicked");
    pVC.classList.remove("clicked");
    return;
  });
  
  pVC.addEventListener("click", () => {
    if (currentPlayers[1] === player2) currentPlayers = [player1, computerPlayer];
    pVC.classList.add("clicked");
    pVP.classList.remove("clicked");
    return;
  });

  return {currentPlayers, pVP, pVC};
})();

// module for difficulty settings
const difficultySetting = (() => {
  const difficultySettingButton = document.querySelector("select");

  let difficulty = difficultySettingButton.value;

  difficultySettingButton.addEventListener("change", (e) => {
    difficulty = difficultySettingButton.value;
  })

  return { difficulty };
})();

// module for showing who turn it is and what symbol he gets
const whosTurnItIs = (() => {
  const whosTurnText = document.querySelector(".navbar_whos_turn");
  const whosTurnTile = document.querySelector(".navbar_mini_tile");

  const text = (str) => {
    whosTurnText.textContent = `${str}`;
  }

  const tile = (sign) => {
    whosTurnTile.textContent = `${sign}`;
  }

  return {text, tile};
})();

// creating a gameboard module
const gameBoard = (() => {
  const tiles = [];
  for (let i=0; i<9; i++) {
    tiles[i] = document.querySelector(`#tile${i}`);
  }

  const changeTileText = (tileNr, currentPlayerSign) => {
    tiles[tileNr+1].textContent = `${currentPlayerSign}`;
  }

  const changeWholeBoardText = (array) => {
    for (let i=0; i<9; i++) {
      tiles[i].textContent = `${array[i]}`;
    }
  }

  return {tiles, changeTileText, changeWholeBoardText};
})();

const winnerCelebration = (() => {
  const gameContainerElement = document.querySelector(".board_container");
  function transition() {
    gameContainerElement.classList.add("winnerTransition");
  }

  function transitionOver() {
    gameContainerElement.classList.remove("winnerTransition");
  }

  return { transition, transitionOver }
})()

const game = (() => {
  let boardState = ["", "", "", "", "", "", "", "", ""];
  let currentPlayers = playersSelect.currentPlayers;
  let currentPlayer = currentPlayers[0];
  whosTurnItIs.text(`${currentPlayer.name} turn`);
  whosTurnItIs.tile(`${currentPlayer.sign}`);
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 3, 6],
  ];

  function resetBoard() {
    gameBoard.changeWholeBoardText(["", "", "", "", "", "", "", "", ""]);
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = currentPlayers[0];
    whosTurnItIs.text(`${currentPlayer.name} turn`);
    whosTurnItIs.tile(`${currentPlayer.sign}`);
    winnerCelebration.transitionOver();
  }

  const resetBoardButton = document.querySelector(".reset_button").addEventListener("click", () => {
    resetBoard();
  })
  
  function switchTurns() {
    if (currentPlayer.name === currentPlayers[0].name) {
      currentPlayer = currentPlayers[1];
    } else {
      currentPlayer = currentPlayers[0];
    }
    whosTurnItIs.text(`${currentPlayer.name} turn`);
    whosTurnItIs.tile(`${currentPlayer.sign}`);
  }

  function checkForWinner() {
    for (let i=0; i<winningPatterns.length; i++){
      if (boardState[winningPatterns[i][0]] === currentPlayer.sign 
        && boardState[winningPatterns[i][1]] === currentPlayer.sign
        && boardState[winningPatterns[i][2]] === currentPlayer.sign) {
        return 1;
      }
    }
    return 0;
  }

  gameBoard.tiles.forEach((tile) => tile.addEventListener("click", () => {
    if (tile.textContent === "") {
      tile.textContent = `${currentPlayer.sign}`;
      boardState[tile.id.slice(-1)] = `${currentPlayer.sign}`;
      checkForWinner() ? winnerCelebration.transition() : switchTurns();
    }
  }))


  return {};
})();
