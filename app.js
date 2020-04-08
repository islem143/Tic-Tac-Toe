const GameBoard = (() => {
  const gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const container = document.querySelector("#gameBoard");
  const spots = document.querySelectorAll(".spot");
  const title = document.querySelector("#title");
  return { gameBoard, container, spots, title };
})();
const GameState = (() => {
  let gameIsFinished = false;

  return { gameIsFinished };
})();

const GameControl = (() => {
  const changeRole = () => {
    if (p1.isPlaying == true) {
      p1.isPlaying = false;
      Play(p2);
    } else {
      p2.isPlaying = false;
      Play(p1);
    }
  };
  const Play = (p) => {
    p.addMarkHandler(p);
  };
  const removeEvent = () => {
    if (p1.isPlaying) GameBoard.container.removeEventListener("click", p1.add);
    else GameBoard.container.removeEventListener("click", p2.add);
  };
  const restartGame = () => {
    GameBoard.gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    GameBoard.spots.forEach((e) => {
      e.textContent = "";
    });
    p1.isPlaying = false;
    p2.isPlaying = false;
    GameState.gameIsFinished = false;
    GameBoard.title.textContent = "Tic Tac Toe";
    startBtn.classList.remove("visibility");
    removeEvent();
  };
  return { changeRole, Play, restartGame, removeEvent };
})();

const Player = (pName, pMark) => {
  const mark = pMark;
  const name = pName;
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
  const isPlaying = false;
  return { name, addMarkHandler, isPlaying, mark, add };
};

GameResult = (() => {
  const displayResultText = () => {
    if (p1.isPlaying) GameBoard.title.textContent = `${p1.mark} wins`;
    else GameBoard.title.textContent = `${p2.mark} wins`;
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
  const checkResult = () => {
    let board = GameBoard.gameBoard;
    console.log(board);

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
      }
    }
    if (equility(board[0][0], board[1][1], board[2][2])) {
      displayResultText();

      GameState.gameIsFinished = true;
    }
    if (equility(board[0][2], board[1][1], board[2][0])) {
      displayResultText();

      GameState.gameIsFinished = true;
    }
  };
  return { checkResult, equility };
})();

//Declaration
let p1 = Player("islem", "x");
let p2 = Player("ahmed", "o");
startBtn = document.querySelector(".start");
startBtn.addEventListener("click", () => {
  GameControl.Play(p1);
  startBtn.classList.toggle("visibility");
});

restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
  GameControl.restartGame();
});
