document.addEventListener('DOMContentLoaded', startGame)

// function to generate the board.
function generateBoard (size) {
  let board = new Object();
  board.cells = [];
  let arrayNum = 0;
  // loop through row numbers
  for (let i = 0; i < size; i++) {
    // loop through column numbers for each row
    for (let j = 0; j < size; j++) {
      // create a cell for each row/column combo. This cell should have a hidden: true and isMine: true.
      board.cells[arrayNum] = {row: i, col: j, isMine: false, hidden: true};
      arrayNum++;
    }
  } 
  assignMines(board, size, size);
  return board;
}
// generate board
let board = generateBoard(3);

// start the game by counting nearby mines and setting event listeners
function startGame () {
  // Don't remove this function call: it makes the game work!
  for (let i = 0; i < board['cells'].length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(i);
  }
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  lib.initBoard();
}


// Assign mines randomly.
function assignMines (board, size){
  // for every 4 cells, add a mine, rounded up or down based on decimal.
  let expectedMines = Math.round((size * size) / 4);
  // create a loop that runs until it has assigned the number of mines calculated.
  for (let i = 0; i < expectedMines; i++) {
    // in each loop, randomly calculate a number between 0 and board.cells.length
    let random = Math.floor(Math.random() * board.cells.length);
    if (!board.cells[random].isMine) {
      board.cells[random].isMine = true;
    } 
    else {
      // remove an iteration count if isMine was already true.
      i--;
    } 
  }
}



// Check for win condition.
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (let i = 0; i < board['cells'].length; i++) {
    if(board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    }
    if(board.cells[i].hidden && !board.cells[i].isMine){
      return;
    }
  }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  lib.displayMessage('You win!');
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  // set surrounding to be an array of the surrounding cell values
  let surrounding = lib.getSurroundingCells(board.cells[cell].row, board.cells[cell].col);
  let count = 0;
  for (i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count++;
    }
    
  } 
  console.log(count);
  return count; 
}

