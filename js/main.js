/*-- state variables --*/
var gameField;
var currentPlayer = 1;
var winner;
var drawMsg = 'The game is a draw.';

/*-- cached DOM elements --*/
var $cells = $("td");
var $msg = $("#message");

function newgame(){
  gameField = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ];
  currentPlayer = 1;
  winner = null;
}


/*-- functions --*/

function getCol(idx) {
  return Math.floor(idx / 6);
};

function getRow(idx) {
  return idx % 6;
};

function render() {
  var colors = {
    '0': '#D6DBB2',
    '1': '#E57A44',
    '-1': '#114B5F'
  };

  // job of render is to transfer state vars to the dom
  $cells.each(function(index, cell) {
    var colIdx = cell.getAttribute('col');
    var rowIdx = cell.getAttribute('row');
    console.log(gameField[colIdx][rowIdx]);
    $(cell).css('background-color', colors[gameField[colIdx][rowIdx]].toString());
  });
  // render winner/tie/whose turn
  if (winner) {
    if (winner === 'T') {
      $msg.html('ITS A TIE!')
    } else {
      $msg.html(`${currentPlayer === -1 ? 'ORANGE' : 'BLACK'} WINS!`);
    }
  } else {
    $msg.html(`Player ${currentPlayer === 1 ? 'ORANGE' : 'BLACK'}'S TURN`);
  }
}

$('button').on('click',function() {
  if (winner) return;
  var colIdx = parseInt(this.id);
  var rowIdx = gameField[colIdx].indexOf(0);
  if(rowIdx === -1) return;
  gameField[colIdx][rowIdx] = currentPlayer;
  currentPlayer *= -1;
  winCheck();
  render();
})

function winCheck() {
  for (var colIdx = 0; colIdx < 6; colIdx++) {
    for (var rowIdx = 0; rowIdx < 5; rowIdx++) {
      winner = chkHor(colIdx, rowIdx) || chkVer(colIdx, rowIdx) || chkDiagUp(colIdx, rowIdx) || chkDiagDown(colIdx, rowIdx);
      if (winner) return;
    }
    if (winner) return;
  }
  // check if there's a tie (no zeroes remaining)
  var hasZeroes = gameField.some(function(colArr) {
    return colArr.includes(0);
  });
  winner = hasZeroes ? null : 'T'; 
};


function chkHor(colIdx, rowIdx) {
  if (colIdx > 3) return null;
  var sum = Math.abs(gameField[colIdx][rowIdx] + gameField[colIdx + 1][rowIdx] + gameField[colIdx + 2][rowIdx] + gameField[colIdx + 3][rowIdx]);
  if (sum === 4) return gameField[colIdx][rowIdx];
  return null;
}

function chkVer(colIdx, rowIdx) {
  if (rowIdx > 2) return null;
  var sum = Math.abs(gameField[colIdx][rowIdx] + gameField[colIdx][rowIdx + 1] + gameField[colIdx][rowIdx + 2] + gameField[colIdx][rowIdx + 3]);
  if (sum === 4) return gameField[colIdx][rowIdx];
  return null;
}

function chkDiagUp(colIdx, rowIdx) {
  if (colIdx > 3 || rowIdx > 2) return null;
  var sum = Math.abs(gameField[colIdx][rowIdx] + gameField[colIdx + 1][rowIdx + 1] + gameField[colIdx + 2][rowIdx + 2] + gameField[colIdx + 3][rowIdx + 3]);
  if (sum === 4) return gameField[colIdx][rowIdx];
  return null;
}

function chkDiagDown(colIdx, rowIdx) {
  if (colIdx > 3 || rowIdx < 3) return null;
  var sum = Math.abs(gameField[colIdx][rowIdx] + gameField[colIdx + 1][rowIdx - 1] + gameField[colIdx + 2][rowIdx - 2] + gameField[colIdx + 3][rowIdx - 3]);
  if (sum === 4) return gameField[colIdx][rowIdx];
  return null;
}

document.querySelector('.rbutton').addEventListener('click', function() {
  newgame();
  render();
}) 

newgame();
render();