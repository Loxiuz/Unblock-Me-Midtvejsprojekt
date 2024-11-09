import { Grid } from "./grid.js";
export {
  makeGrid,
  readFromCell,
  writeToCell,
  writeBlockToCells as writeBlockToCell,
};

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
  console.log(grid.get(row, col));
  return grid.get(row, col);
}

function writeToCell(row, col, value) {
  grid.set(row, col, value);
}

function writeBlockToCells(block) {
  for (let i = 0; i < block.cells.size(); i++) {
    grid.set(block.cells.get(i).row, block.cells.get(i).col, block.type);
  }
}
