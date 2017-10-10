/*-- state variables --*/
var gameField;
var currentPlayer;
var winner;

/*-- cached DOM elements --*/
var cells = document.querySelectorAll("td");

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

/*-- event listeners --*/
  // var colArr = gameField[colIdx];



/*-- functions --*/

function getCol(idx) {
  return Math.floor(idx / 6);
}

function getRow(idx) {
  return idx % 6;
}

function render() {
  var colors = {
    '0': 'white',
    '1': 'red',
    '-1': 'yellow'
  };
  // job of render is to transfer state vars to the dom
  cells.forEach(function(cell) {
    var colIdx = cell.getAttribute('col');
    var rowIdx = cell.getAttribute('row');
    cell.style.backgroundColor = colors[gameField[colIdx][rowIdx]];
  });
  $('button').on('click',function() {
    var colIdx = parseInt(allbuttons.id);
    var rowIdx = gameField[colIdx].indexOf('0');
    if(rowIdx === -1) return;
    gameField[colIdx][rowIdx] = currentPlayer;
    currentPlayer += -1;
});
}


newgame();
render();
currentPlayer = 1
currentPlayer += -1