import { Grid } from "./grid.js";
export { makeGrid, readFromCell, writeToCell, writeBlockToCells, move };

let grid = [];

function makeGrid(row, col) {
  grid = new Grid(row, col);
  for (let i = 0; i < grid.rows(); i++) {
    for (let j = 0; j < grid.cols(); j++) {
      grid.set(i, j, 0);
    }
  }
  return grid;
}

function readFromCell(row, col) {
  //console.log(grid.get(row, col));
  return grid.get(row, col);
}

function writeToCell(row, col, value) {
  grid.set(row, col, value);
}

function writeBlockToCells(block) {
  // console.log(block);
  for (let i = 0; i < block.cells.length; i++) {
    grid.set(
      block.cells.get(i).data.row,
      block.cells.get(i).data.col,
      block.type
    );
  }
}

function move(direction, block) {
  
  console.log(block.head.col);
  switch(direction) {
      case "ArrowLeft": 
      block.head.col--;
      if(block.head.col < 0) {
        block.head.col = grid.cols() - 1;
      } break;
      case "ArrowRight": 
      block.head.col++;
      if(block.head.col > grid.cols() - 1) {
        block.head.col = 0;
      } break;
      case "ArrowUp": 
      block.head.row--;
      if(block.head.row < 0) {
        block.head.row = grid.rows() - 1;
      } break;
      case "ArrowDown": block.head.row++;
      if(block.head.row > grid.rows()-1) {
        block.head.row = 0;
      } break;
  }
}
