// add music
let turn = new Audio("./assets/music/ting.mp3");
let gameover = new Audio("./assets/music/gameover.mp3");
//getting elements
let box = document.querySelectorAll(`.hover`);
let scoreX = document.getElementById(`score-X`);
let scoreO = document.getElementById(`score-O`);
let scoreTie = document.getElementById(`score-tie`);
let h2 = document.querySelector(`h2`);
let nameInput = document.getElementById(`submit-name`);
let playerXName = document.getElementById(`playerXName`);
let playerOName = document.getElementById(`playerOName`);
let popup = document.getElementById(`popup`);
let XName = document.getElementById(`XName`);
let OName = document.getElementById(`OName`);
let preXName = document.getElementById(`preXName`);
let preOName = document.getElementById(`preOName`);
let tops = document.getElementById(`top`);
// default player
let CurrentPlayer = "O";

//saving filled boxes indexes
let indexOfX = [];
let indexOfO = [];

//counter for score
let counterX = 0;
let counterO = 0;
let counterTie = 0;

//getting players name
function enterName() {
  nameInput.addEventListener(`click`, function () {
    if (playerXName.value == "") {
      alert("Please enter the  name of player-1");
      return;
    }
    if (playerOName.value == "") {
      alert("Please enter the  name of player-2");
      return;
    }
    gameContainer.style.visibility = `visible`;
    // current plaYERS updates
    XName.innerText = playerXName.value;
    OName.innerText = playerOName.value;
    console.log(playerXName.value);
    console.log(playerOName.value);

    //previous score board  updates
    // preXName.innerText = playerOne;
    // preOName.innerText = playerTwo;

    h2.innerText = `Turn of ${playerXName.value}`;
    popup.style.visibility = `hidden`;
  });
}
enterName();

// check win
let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//  win function
function CheckWin() {
  for (let i = 0; i < winConditions.length; i++) {
    // checking condition for X
    if (
      indexOfX.includes(winConditions[i][0]) &&
      indexOfX.includes(winConditions[i][1]) &&
      indexOfX.includes(winConditions[i][2])
    ) {
      CurrentWinner();
      CurrentPlayer = "";
      ClearIndex();
      gameover.play();
      counterO++;
      scoreO.innerText = counterO;
      RoundWinner();
      tops.innerHTML = `Winner of this round is ${playerOName.value}`;
      localStorage.setItem(`roundTime`, JSON.stringify(timer.innerText));
      timerStop();
    }
    //checking condition for X
    else if (
      indexOfO.includes(winConditions[i][0]) &&
      indexOfO.includes(winConditions[i][1]) &&
      indexOfO.includes(winConditions[i][2])
    ) {
      CurrentWinner();
      CurrentPlayer = "";
      ClearIndex();
      gameover.play();
      counterX++;
      scoreX.innerText = counterX;
      RoundWinner();
      tops.innerHTML = `Winner of this round is ${playerXName.value}`;
      localStorage.setItem(`roundTime`, JSON.stringify(timer.innerText));
      timerStop();
    }
  }
  //checking for tie
  if (indexOfO.length + indexOfX.length >= 9) {
    h2.innerText = `Match is Tie`;
    GreenColour();
    gameover.play();
    counterTie++;
    scoreTie.innerText = counterTie;
    RoundWinner();
    tops.innerHTML = `This round is tie`;
    localStorage.setItem(`roundTime`, JSON.stringify(timer.innerText));
    timerStop();
  }
  localStorage.setItem(`scoreX`, JSON.stringify(counterX));
  localStorage.setItem(`scoreO`, JSON.stringify(counterO));
  localStorage.setItem(`scoreTie`, JSON.stringify(counterTie));
  localStorage.setItem(`nameX`, JSON.stringify(playerXName.value));
  localStorage.setItem(`nameO`, JSON.stringify(playerOName.value));
}

//game logic
function GameLogic() {
  //loop on boxes
  for (let i = 0; i < box.length; i++) {
    box[i].addEventListener(`click`, function () {
      //handle change turn after complete turn
      if (box[i].innerText != "") {
        return;
      }
      CurrentPlay();
      DisplayPlayer();
      if (CurrentPlayer == "O") {
        box[i].style.color = `red`;
        indexOfX.push(i);
      } else if (CurrentPlayer == "X") {
        box[i].style.color = `blue`;
        indexOfO.push(i);
      }
      box[i].innerText = CurrentPlayer;
      turn.play();
      CheckWin();
      renderPreviousData();
    });
  }
}
GameLogic();

//clear boxes
function ClearBox() {
  for (let i = 0; i < box.length; i++) {
    box[i].innerText = " ";
  }
  CurrentPlayer = "X";
  CurrentPlay();
  gameover.play();
}
//clear index
function ClearIndex() {
  indexOfX.length = 0;
  indexOfO.length = 0;
}

//current player
function CurrentPlay() {
  if (CurrentPlayer == "O") {
    CurrentPlayer = "X";
  }
  // change turn if X
  else if (CurrentPlayer == "X") {
    CurrentPlayer = "O";
  }
}

//winner function
function CurrentWinner() {
  if (CurrentPlayer == "O") {
    h2.innerText = `${playerOName.value}  is winner`;
    h2.style.paddingInline = `20px`;
    RedColour();
  } else {
    h2.innerText = `${playerXName.value}  is winner`;
    h2.style.paddingInline = `20px`;
    blueColour();
  }
}

// display currentplayer
function DisplayPlayer() {
  if (CurrentPlayer == "X") {
    h2.innerText = `Turn of ${playerOName.value}`;
    h2.style.backgroundColor = `Black`;
  } else {
    h2.innerText = `Turn of ${playerXName.value}`;
    h2.style.backgroundColor = `Black`;
  }
}

//red colour in h2 for X
function RedColour() {
  h2.style.backgroundColor = `Red`;
}

//blue color for O
function blueColour() {
  h2.style.backgroundColor = `blue`;
}

//green colour for match tie
function GreenColour() {
  return (h2.style.backgroundColor = `Green`);
}

//previous score board
let board = document.getElementById(`board`);
let view = document.getElementById(`View_previous`);
let gameContainer = document.getElementById(`game-container`);
function leaderBoard() {
  board.style.visibility = `hidden`;
  gameContainer.style.visibility = `hidden`;

  view.addEventListener(`click`, function () {
    board.style.visibility = `visible`;
    gameContainer.style.visibility = `hidden`;
  });
}
leaderBoard();

//cross image handle
let crossImg = document.getElementById(`cross_img`);
crossImg.addEventListener(`click`, function () {
  board.style.visibility = `hidden`;
  gameContainer.style.visibility = `visible`;
});

//timer
function RoundWinner() {
  board.style.visibility = `visible`;
  gameContainer.style.visibility = `hidden`;
  renderPreviousData();
}
//start timer
let timer = document.getElementById(`timer`);
let seconds = 0;
let minuts = 0;
let timeInterval;
function timerStart() {
  timeInterval = setInterval(() => {
    seconds++;
    timer.innerText = "00:0" + minuts + ":" + seconds;
    if (seconds <= 9) {
      timer.innerText = "00:0" + minuts + ":0" + seconds;
    }

    if (seconds >= 59) {
      seconds = 0;
      minuts += 1;
    }
  }, 1000);
}

//stop timer
function timerStop() {
  localStorage.setItem(`roundTime`, JSON.stringify(timer.innerHTML));
  seconds = 0;
  timer.innerText = "00:0" + minuts + ":0" + seconds;
  clearInterval(timeInterval);
}

//render previous data on previous board
function renderPreviousData() {
  let preScoreX = document.getElementById(`prescoreX`);
  preScoreX.innerHTML = `
<div id="prePlayerXname">${JSON.parse(localStorage.getItem(`nameX`))}</div>
<div id="prePlayerXScore">${JSON.parse(localStorage.getItem(`scoreX`))}</div>
`;

  let preScoreO = document.getElementById(`prescoreO`);
  preScoreO.innerHTML = `
<div id="prePlayerOname">${JSON.parse(localStorage.getItem(`nameO`))}</div>
<div id="prePlayerOScore">${JSON.parse(localStorage.getItem(`scoreO`))}</div>
`;

  let preScoreTie = document.getElementById(`prescoreTie`);
  preScoreTie.innerHTML = `
<div id="prePlayerTiename">Tie</div>
<div id="prePlayerTieScore">${JSON.parse(
    localStorage.getItem(`scoreTie`)
  )}</div>
`;
  let roundTime = document.getElementById(`roundTime`);
  roundTime.innerHTML = `<div id="timeLabel">Time taken</div>
  <div id="preRoundTime"></div>
  `;
  let preRoundTime = document.getElementById(`preRoundTime`);
  preRoundTime.innerText = JSON.parse(localStorage.getItem(`roundTime`));
}
