import Block from "./Block.js";
import * as model from "./boardModel.js";
import Stack from "./stack.js";
import * as view from "./view.js";

window.addEventListener("load", start);

let row = 6;
let col = 6;

function start() {
  console.log(`Javascript kører`);

  model.makeGrid(row, col);
  view.createBoard(row, col);
  setLevel();
  view.displayBoard(row, col);
}

function setLevel() {
  const cells = new Stack();
  cells.push({ row: 2, col: 3 });
  cells.push({ row: 2, col: 4 });

  const block = new Block("h", 1, cells);

  model.writeBlockToCell(block);
}
