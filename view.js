export {displayBoard,createBoard};
//import {readFromCell as readFromCell} from './model.js';

// Board dimensions - These have been replace with row and col from controller
//const height = 319;
//const width = 20;

let cssVariables = document.querySelector(':root')


function createBoard(row, col) {
    const htmlGrid = document.getElementById("grid");
    // Clear?
    //console.log(`Rows: ${row}, Cols: ${col}`);

    for (let i = 0; i < row; i++) {
        //rowDiv.classList.add("row");

        // TODO: Now it makes sense why I was confused about having to write 319 rows
        // LOOK CHATGPT AND FIX THIS ISSUE HERE

        for (let j = 0; j < col; j++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          htmlGrid.appendChild(cell);
        }

        //htmlGrid.appendChild(cell);
    }
    //console.log(`Created ${htmlGrid.children.length} cells.`);


    cssVariables.style.setProperty('--grid-repeat', col)
}

  function displayBoard(rows, cols) {
    const cells = document.querySelectorAll("#grid .cell");

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
  
        switch (readFromCell(row, col)) {
          case 0:
            cells[index].classList.remove("player", "food");
            break;
          case 1: // Note: doesn't remove goal if previously set
            cells[index].classList.add("player");
            break;
        }
      }
    }
  }  