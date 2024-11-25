import { Grid } from "./grid.js";
import Queue from "./queue.js";
export {
  getBlocks,
  makeGrid,
  readFromCell,
  writeToCell,
  writeBlockToCells,
  move,
  getGrid,
  setLevel
};

let grid;
let blocks = [];

function getGrid() {
  return grid;
}

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
    console.log(block.cells.get(i));
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

  blockCells.dequeue();

  blockCells.enqueue(head);

  for (let i = 0; i < blockCells.size(); i++) {
    const blockData = blockCells.get(i).data;
    console.log(blockData);
    grid.set(blockData.row, blockData.col, block.type);
  }
}

async function setLevel() {
  const response = await fetch("level.json");
  const data = await response.json();
  //todo: Delete?
  //const blocks = data.blocks;

  for (let i = 0; i < data.blocks.length; i++) {
    const cells = data.blocks[i].cells;
    const queue = new Queue();

    for (let j = 0; j < cells.length; j++) {
      queue.enqueue(cells[j]);
    }

    data.blocks[i].cells = queue;

    writeBlockToCells(data.blocks[i]);
  }
}