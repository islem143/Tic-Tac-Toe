/*GameBorad prop and methods */

const GameBoard = (() => {
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const container = document.querySelector("#gameBoard");
  const spots = document.querySelectorAll(".spot");
  const resultText = document.querySelector("#result");
  return { gameBoard, container, spots, resultText };
})();
/*GameState prop and methods */

const GameState = (() => {
  let gameIsFinished = false;
  let thereIsAwinner = false;

  return { gameIsFinished, thereIsAwinner };
})();
/*Gamebuttons prop and methods */

const GameButtons = (() => {
  const startBtn = document.querySelector(".start");
  const restartBtn = document.querySelector(".restart");
  const addEventTostartButton = () => {
    startBtn.addEventListener("click", () => {
      GameControl.giveControlTo(p1);
      startBtn.classList.toggle("visibility");
    });
  };
  const addEventTorestartButton = () => {
    restartBtn.addEventListener("click", () => {
      GameControl.restartGame();
    });
  };
  return {
    addEventTostartButton,
    addEventTorestartButton,
    startBtn,
    restartBtn,
  };
})();

/*GameControlprop and methods */

const GameControl = (() => {
  const changeRole = () => {
    if (p1.isPlaying == true) {
      p1.isPlaying = false;
      giveControlTo(p2);
    } else {
      p2.isPlaying = false;
      giveControlTo(p1);
    }
  };
  const giveControlTo = (p) => {
    p.addMarkHandler(p);
  };
  const removeClickEvent = () => {
    GameBoard.container.removeEventListener("click", p1.add);
    GameBoard.container.removeEventListener("click", p2.add);
  };
  const resetPlayerState = () => {
    p1.isPlaying = false;
    p2.isPlaying = false;
  };
  const resetBoardState = () => {
    GameBoard.gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    GameBoard.spots.forEach((e) => {
      e.textContent = "";
    });
    GameBoard.resultText.textContent = "Tic Tac Toe";
  };
  const resetGameState = () => {
    GameState.gameIsFinished = false;
  };
  const restartGame = () => {
    resetBoardState();
    resetPlayerState();
    resetGameState();
    removeClickEvent();
    GameButtons.startBtn.classList.remove("visibility");
  };
  return { changeRole, giveControlTo, restartGame, removeClickEvent };
})();

/*Player prop and methods */

const Player = (pName, pMark) => {
  const name = pName;
  const mark = pMark;
  const isPlaying = false;
  const add = (e) => {
    if (e.target.textContent == "") {
      let id;
      e.target.textContent = mark;
      id = e.target.id;
      let [i, j] = id.split("");
      GameBoard.gameBoard[i - 1][j - 1] = e.target.textContent;
      GameBoard.container.removeEventListener("click", add);
      GameResult.checkResult();
      if (!GameState.gameIsFinished) GameControl.changeRole();
    }
  };
  const addMarkHandler = (p) => {
    p.isPlaying = true;
    GameBoard.container.addEventListener("click", add);
  };

  return { addMarkHandler, add, name, isPlaying, mark };
};
/*Gameresult prop and methods */

GameResult = (() => {
  const displayResultText = () => {
    if (p1.isPlaying) GameBoard.resultText.textContent = `${p1.name} wins`;
    else GameBoard.resultText.textContent = `${p2.name} wins`;
  };
  const equility = (a, b, c) => {
    if ((a == "") | (b == "") | (c == "")) return false;
    else if (a == "x" && b == "x" && c == "x") {
      return true;
    } else if (a == "o" && b == "o" && c == "o") {
      return true;
    } else {
      return false;
    }
  };
  const gameBoardIsFilled = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (GameBoard.gameBoard[i][j] == "") return false;
      }
    }
    return true;
  };

  const checkResult = () => {
    let board = GameBoard.gameBoard;
    for (let i = 0; i < 3; i++) {
      if (equility(board[i][0], board[i][1], board[i][2])) {
        displayResultText();
        GameState.gameIsFinished = true;
      }
    }
    for (let j = 0; j < 3; j++) {
      if (equility(board[0][j], board[1][j], board[2][j])) {
        displayResultText();
        GameState.gameIsFinished = true;
        GameState.thereIsAwinner = true;
      }
    }
    if (equility(board[0][0], board[1][1], board[2][2])) {
      displayResultText();
      GameState.thereIsAwinner = true;
      GameState.gameIsFinished = true;
    }
    if (equility(board[0][2], board[1][1], board[2][0])) {
      displayResultText();
      GameState.thereIsAwinner = true;
      GameState.gameIsFinished = true;
    }

    if (gameBoardIsFilled() && !GameState.thereIsAwinner) console.log("tie");
  };
  return { checkResult, equility, gameBoardIsFilled };
})();

// start here //
let p1 = Player("islem", "x");
let p2 = Player("ahmed", "o");
GameButtons.addEventTostartButton();
GameButtons.addEventTorestartButton();
