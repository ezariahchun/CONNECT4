/*-- state variables --*/
var gameField;
var currentPlayer = 1;
var winner;

/*-- cached DOM elements --*/
var cells = $("td");

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
    '0': '#FBFEFB',
    '1': '#F87060',
    '-1': '#B3A394'
  };
  // job of render is to transfer state vars to the dom
  cells.each(function(index, cell) {
    var colIdx = cell.getAttribute('col');
    var rowIdx = cell.getAttribute('row');
    console.log(gameField[colIdx][rowIdx]);
    $(cell).css('background-color', colors[gameField[colIdx][rowIdx]].toString());
  });
}

$('button').on('click',function() {
  var colIdx = parseInt(this.id);
  var rowIdx = gameField[colIdx].indexOf(0);
  if(rowIdx === -1) return;
  gameField[colIdx][rowIdx] = currentPlayer;
  currentPlayer *= -1;
  render();
})



newgame();
render();
