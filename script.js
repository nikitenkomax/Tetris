const main = document.querySelector('.main');
const scoreElem = document.querySelector('#score');
const levelElem = document.querySelector('#level');
const linesElem = document.querySelector('#lines');
const nextTetroElem = document.querySelector('.next-tetro');
const startBtn = document.querySelector('.start-btn');
const pauseBtn = document.querySelector('.pause-btn');
const info = document.querySelector('.cell');
const modalMask = document.querySelector('.modal-mask');
const gameOver = document.querySelector('.game-over');
const tetrisPercentElem = document.querySelector('.tetris-percent');
const waitCell = document.querySelectorAll('.wait-cell');
const waitCurrentElem = document.querySelector('.wait-current');
let playfield = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
// const playfield = Array(20).fill(Array(10).fill(0));
// console.log(playfield);
let score = 0;
let currentLevel = 1;
let isPaused = true;
let currentWait = 0;
let currentI = 0;
let possibleLevels = {
  1: {
    scorePerLine: 10,
    speed: 600,
    nextLevelScore: 500,
    nextLevelLines: 50,
  },
  2: {
    scorePerLine: 20,
    speed: 500,
    nextLevelScore: 1500,
    nextLevelLines: 100,
  },
  3: {
    scorePerLine: 30,
    speed: 400,
    nextLevelScore: 4500,
    nextLevelLines: 140,
  },
  4: {
    scorePerLine: 40,
    speed: 250,
    nextLevelScore: 9000,
    nextLevelLines: 180,
  },
  5: {
    scorePerLine: 50,
    speed: 200,
    nextLevelScore: 20000,
    nextLevelLines: 210,
  },
  6: {
    scorePerLine: 60,
    speed: 180,
    nextLevelScore: Infinity,
    nextLevelLines: 240,
  },
  7: {
    scorePerLine: 70,
    speed: 160,
    nextLevelScore: Infinity,
    nextLevelLines: 260,
  },
  8: {
    scorePerLine: 80,
    speed: 150,
    nextLevelScore: Infinity,
    nextLevelLines: 280,
  },
  9: {
    scorePerLine: 90,
    speed: 140,
    nextLevelScore: Infinity,
    nextLevelLines: 300,
  },
  10: {
    scorePerLine: 100,
    speed: 130,
    nextLevelScore: Infinity,
    nextLevelLines: 320,
  },
  11: {
    scorePerLine: 110,
    speed: 120,
    nextLevelScore: Infinity,
    nextLevelLines: 340,
  },
  12: {
    scorePerLine: 120,
    speed: 110,
    nextLevelScore: Infinity,
    nextLevelLines: 360,
  },
  13: {
    scorePerLine: 130,
    speed: 100,
    nextLevelScore: Infinity,
    nextLevelLines: 380,
  },
  14: {
    scorePerLine: 140,
    speed: 95,
    nextLevelScore: Infinity,
    nextLevelLines: 400,
  },
  15: {
    scorePerLine: 150,
    speed: 90,
    nextLevelScore: Infinity,
    nextLevelLines: 420,
  },
  16: {
    scorePerLine: 160,
    speed: 85,
    nextLevelScore: Infinity,
    nextLevelLines: 440,
  },
  17: {
    scorePerLine: 170,
    speed: 80,
    nextLevelScore: Infinity,
    nextLevelLines: 460,
  },
  18: {
    scorePerLine: 180,
    speed: 75,
    nextLevelScore: Infinity,
    nextLevelLines: 480,
  },
  19: {
    scorePerLine: 190,
    speed: 70,
    nextLevelScore: Infinity,
    nextLevelLines: 500,
  },
  20: {
    scorePerLine: 200,
    speed: 65,
    nextLevelScore: Infinity,
    nextLevelLines: Infinity,
  },
};

let figures = {
  O: [
    [1, 1],
    [1, 1],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
};

tetrisPercentElem.innerHTML = '0 %';

let activeTetro = getNewTetro();
let nextTetro = getNewTetro();
function draw() {
  let mainInnerHTML = '';
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      // console.log(playfield[x]);
      if (playfield[y][x] === 1) {
        mainInnerHTML += '<div class="cell movingCell"></div>';
      } else if (playfield[y][x] === 2) {
        mainInnerHTML += '<div class="cell fixedCell"></div>';
      } else {
        mainInnerHTML += '<div class="cell"></div>';
      }
    }
  }
  main.innerHTML = mainInnerHTML;
}

function drawNextTetro() {
  let nextTetroInnerHTML = '';
  for (let y = 0; y < nextTetro.shape.length; y++) {
    for (let x = 0; x < nextTetro.shape[y].length; x++) {
      if (nextTetro.shape[y][x] === 1) {
        nextTetroInnerHTML += '<div class="cell movingCell"></div>';
      } else {
        nextTetroInnerHTML += '<div class="cell"></div>';
      }
    }
    nextTetroInnerHTML += '<br/>';
  }
  nextTetroElem.innerHTML = nextTetroInnerHTML;
}

//Move left
// function canTetroMoveLeft() {
//   for (let y = playfield.length - 1; y >= 0; y--) {
//     for (let x = 0; x < playfield[y].length; x++) {
//       if (playfield[y][x] === 1 && (x === 0 || playfield[y][x - 1] === 2)) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

// function moveTetroLeft() {
//   if (canTetroMoveLeft()) {
//     for (let y = playfield.length - 1; y >= 0; y--) {
//       for (let x = 0; x < playfield[y].length; x++) {
//         if (playfield[y][x] === 1) {
//           playfield[y][x - 1] = 1;
//           playfield[y][x] = 0;
//         }
//       }
//     }
//   }
// }
//Move right
// function canTetroMoveRight() {
//   for (let y = playfield.length - 1; y >= 0; y--) {
//     for (let x = 0; x < playfield[y].length; x++) {
//       if (playfield[y][x] === 1 && (x === 9 || playfield[y][x + 1] === 2)) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

// function moveTetroRight() {
//   if (canTetroMoveRight()) {
//     for (let y = playfield.length - 1; y >= 0; y--) {
//       for (let x = 9; x >= 0; x--) {
//         if (playfield[y][x] === 1) {
//           playfield[y][x + 1] = 1;
//           playfield[y][x] = 0;
//         }
//       }
//     }
//   }
// }

function removePrevActiveTetro() {
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 0;
      }
    }
  }
}

function addActiveTetro() {
  removePrevActiveTetro();
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (activeTetro.shape[y][x] === 1) {
        playfield[activeTetro.y + y][activeTetro.x + x] =
          activeTetro.shape[y][x];
      }
    }
  }
}

function rotateTetro() {
  const prevTetroState = activeTetro.shape;
  activeTetro.shape = activeTetro.shape[0].map((val, index) =>
    activeTetro.shape.map((row) => row[index]).reverse()
  );
  if (hasCollisions()) {
    activeTetro.shape = prevTetroState;
  }
}

function hasCollisions() {
  for (let y = 0; y < activeTetro.shape.length; y++) {
    for (let x = 0; x < activeTetro.shape[y].length; x++) {
      if (
        activeTetro.shape[y][x] &&
        (playfield[activeTetro.y + y] === undefined ||
          playfield[activeTetro.y + y][activeTetro.x + x] === undefined ||
          playfield[activeTetro.y + y][activeTetro.x + x] === 2)
      ) {
        return true;
      }
    }
  }
  return false;
}
//движение вниз
// function canTetroMoveDown() {
//   for (let y = playfield.length - 1; y >= 0; y--) {
//     for (let x = 0; x < playfield[y].length; x++) {
//       if (
//         playfield[y][x] === 1 &&
//         (y === playfield.length - 1 || playfield[y + 1][x] === 2)
//       ) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

// function moveTetroDown() {
//   if (canTetroMoveDown()) {
//     for (let y = playfield.length - 1; y >= 0; y--) {
//       for (let x = 0; x < playfield[y].length; x++) {
//         if (playfield[y][x] === 1) {
//           playfield[y + 1][x] = 1;
//           playfield[y][x] = 0;
//         }
//       }
//     }
//   } else {
//     fixedTetro();
//   }
// }

function moveTetroDown() {
  if (!isPaused) {
    activeTetro.y += 1;
    if (hasCollisions()) {
      activeTetro.y -= 1;
      fixedTetro();
      removeFullLines();
      activeTetro = nextTetro;
      if (hasCollisions()) {
        reset();
      }
      nextTetro = getNewTetro();
    }
  }
}

function reset() {
  isPaused = true;
  modalMask.classList.add('active');
}
modalMask.addEventListener('click', () => {
  modalMask.classList.remove('active');

  playfield = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  score = 0;
  scoreElem.innerHTML = 0;
  levelElem.innerHTML = 1;
  linesElem.innerHTML = 0;
  tetrisPercentElem.innerHTML = '0 %';
  draw();
  addActiveTetro();
  addActiveTetro();
  isPaused = false;
  currentLevel = 1;
  filledLinesCurrent = 0;
  tetrisPercent = 0;
  filledLinesCurrent = 0;
  tetrisCurrent = 0;
  currentWait = 0;
  currentI = 0;
  waitCurrentElem.innerHTML = 0;
  // possibleLevels[currentLevel].speed = 400;
  // possibleLevels[currentLevel].nextLevelScore = 5;

  // console.log(possibleLevels[currentLevel]);
});

let current = 0;
let filledLinesCurrent = 0;
let tetrisCurrent = 0;
let tetrisPercent = 0;
function removeFullLines() {
  let canRemoveLines = true;
  let filledLines = 0;
  for (let y = 0; y < playfield.length; y++) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] !== 2) {
        canRemoveLines = false;
        break;
      }
    }
    if (canRemoveLines) {
      playfield.splice(y, 1);
      playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      filledLines++;
      if (filledLines) {
        filledLinesCurrent++;
      }
      // filledLinesCurrent;
      // console.log('сгоревшие линии', filledLines);
    }
    canRemoveLines = true;

    // return filledLines;
  }
  switch (filledLines) {
    case 1:
      score += possibleLevels[currentLevel].scorePerLine;
      break;
    case 2:
      score += possibleLevels[currentLevel].scorePerLine * 3;
      break;
    case 3:
      score += possibleLevels[currentLevel].scorePerLine * 6;
      break;
    case 4:
      score += possibleLevels[currentLevel].scorePerLine * 12;
      break;
  }
  linesElem.innerHTML = filledLinesCurrent;
  scoreElem.innerHTML = score;
  // console.log('сгоревшие линии', filledLines);

  // console.log('счетчик', filledLinesCurrent);
  if (filledLines === 4) {
    tetrisCurrent++;
  }
  tetrisPercent = (tetrisCurrent * 4 * 100) / filledLinesCurrent;
  // console.log('процент тетрисов', Math.round(tetrisPercent));
  // console.log('тетрисы', tetrisCurrent);
  if (tetrisPercent >= 0) {
    tetrisPercentElem.innerHTML = `${Math.round(tetrisPercent)} %`;
  } else {
    tetrisPercentElem.innerHTML = '0 %';
  }

  if (filledLinesCurrent >= possibleLevels[currentLevel].nextLevelLines) {
    currentLevel++;
    levelElem.innerHTML = currentLevel;
  }
}

function getNewTetro() {
  const possibleFigures = 'IOLJTSZ';
  const rand = Math.floor(Math.random() * 7);
  const newTetro = figures[possibleFigures[rand]];

  return {
    x: Math.floor((10 - newTetro[0].length) / 2),
    y: 0,
    shape: newTetro,
  };
}

function fixedTetro() {
  for (let y = playfield.length - 1; y >= 0; y--) {
    for (let x = 0; x < playfield[y].length; x++) {
      if (playfield[y][x] === 1) {
        playfield[y][x] = 2;
      }
    }
  }
  // getNewTetro();
  // console.log(nextTetro.shape);
  if (nextTetro.shape === figures.I) {
    currentWait = 0;
    currentI++;
  } else {
    currentWait++;
  }
  if (currentWait >= 10) {
    waitCurrentElem.innerHTML = `= ${currentWait}`;
    waitCell.forEach((e) => {
      e.classList.add('red');
    });
  } else {
    waitCurrentElem.innerHTML = `= ${currentI}`;
    waitCell.forEach((e) => {
      e.classList.remove('red');
    });
  }

  // console.log(currentWait);

  // removeFullLines();
  // playfield[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
  // playfield[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0];
}

function dropTetro() {
  for (let y = activeTetro.y; y < playfield.length; y++) {
    activeTetro.y += 1;
    if (hasCollisions()) {
      activeTetro.y -= 1;
      break;
    }
  }
}

document.addEventListener('keydown', function name(event) {
  if (!isPaused) {
    if (event.keyCode === 37) {
      activeTetro.x -= 1;
      if (hasCollisions()) {
        activeTetro.x += 1;
      }
    } else if (event.keyCode === 39) {
      activeTetro.x += 1;
      if (hasCollisions()) {
        activeTetro.x -= 1;
      }
    } else if (event.keyCode === 40) {
      moveTetroDown();
    } else if (event.keyCode === 38) {
      rotateTetro();
    } else if (event.keyCode === 32) {
      dropTetro();
    }
    addActiveTetro();
    draw();
    drawNextTetro();
  }
});
pauseBtn.style.display = 'none';
pauseBtn.addEventListener('click', (e) => {
  if (e.target.innerHTML === 'Pause') {
    e.target.innerHTML = 'Keep Playing...';
    isPaused = true;
    // pauseBtn.blur();
  } else {
    e.target.innerHTML = 'Pause';
    isPaused = false;
    pauseBtn.blur();
  }
});

startBtn.addEventListener('click', (e) => {
  setTimeout(startGame, possibleLevels[currentLevel].speed);
  startBtn.disabled = true;
  isPaused = false;
  pauseBtn.style.display = 'inline';
  addActiveTetro();
  drawNextTetro();
  startBtn.blur();
});

scoreElem.innerHTML = score;
levelElem.innerHTML = currentLevel;
draw();

function startGame() {
  if (!isPaused) {
    moveTetroDown();
    addActiveTetro();
    draw();
    drawNextTetro();
  }

  setTimeout(startGame, possibleLevels[currentLevel].speed);
}

// setTimeout(startGame, possibleLevels[currentLevel].speed);
