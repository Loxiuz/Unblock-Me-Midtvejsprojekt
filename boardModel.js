import { Grid } from "./grid.js";
export {
  getBlocks,
  makeGrid,
  readFromCell,
  writeToCell,
  writeBlockToCells,
  move,
};

export let grid = [];
let blocks = [];

function getBlocks() {
  return blocks;
}

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
  return grid.get(row, col);
}

function writeToCell(row, col, value) {
  grid.set(row, col, value);
}

function writeBlockToCells(block) {
  blocks.push(block);
  for (let i = 0; i < block.cells.length; i++) {
    grid.set(
      block.cells.get(i).data.row,
      block.cells.get(i).data.col,
      block.type
    );
  }
}

function move(currDirection, block) {
  console.log(block);

  const blockCells = block.cells;

  for (let i = 0; i < blockCells.size(); i++) {
    const blockData = blockCells.get(i).data;
    grid.set(blockData.row, blockData.col, 0);
  }

  const head = {
    row: blockCells.get(blockCells.size() - 1).data.row,
    col: blockCells.get(blockCells.size() - 1).data.col,
  };

  console.log(head);
  console.log(currDirection);

  switch (currDirection) {
    case "ArrowLeft":
      head.col--;
      if (head.col < 0) {
        head.col = grid.cols() - 1;
      }
      break;
    case "ArrowRight":
      head.col++;
      if (head.col > grid.cols() - 1) {
        head.col = 0;
      }
      break;
    case "ArrowUp":
      head.row--;
      if (head.row < 0) {
        head.row = grid.rows() - 1;
      }
      break;
    case "ArrowDown":
      head.row++;
      if (head.row > grid.rows() - 1) {
        head.row = 0;
      }
      break;
  }

  blockCells.enqueue(head);

  blockCells.dequeue();

  for (let i = 0; i < blockCells.size(); i++) {
    const blockData = blockCells.get(i).data;
    grid.set(blockData.row, blockData.col, block.type);
  }
}
