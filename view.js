export { displayBoard, createBoard };
import { readFromCell } from "./boardModel.js";

let cssVariables = document.querySelector(":root");

function createBoard(row, col) {
  const htmlGrid = document.getElementById("grid");

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      htmlGrid.appendChild(cell);
    }
  }
  cssVariables.style.setProperty("--grid-repeat", col);
}

function displayBoard(rows, cols) {
  const cells = document.querySelectorAll("#grid .cell");

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      //console.log(readFromCell(row, col));
      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "block");
          break;
        case 1:
          cells[index].classList.add("player");
          break;
        case 2:
          cells[index].classList.add("block");
          break;
      }
    }
  }
}
