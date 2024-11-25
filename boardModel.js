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
  setLevel,
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
    // console.log(block.cells.get(i));
    grid.set(
      block.cells.get(i).data.row,
      block.cells.get(i).data.col,
      block.type
    );
  }
}

function move(currDirection, block) {
  console.log(`Moving block ${block.id} ${currDirection}`);

  const blockCells = block.cells;

  for (let i = 0; i < blockCells.size(); i++) {
    const blockData = blockCells.get(i).data;
    grid.set(blockData.row, blockData.col, 0);
  }

  const newPositions = [];
  for (let i = 0; i < blockCells.size(); i++) {
    const blockData = blockCells.get(i).data;
    let newRow = blockData.row;
    let newCol = blockData.col;

    switch (currDirection) {
      case "ArrowLeft":
        newCol = (newCol - 1 + grid.cols()) % grid.cols();
        break;
      case "ArrowRight":
        newCol = (newCol + 1) % grid.cols();
        break;
      case "ArrowUp":
        newRow = (newRow - 1 + grid.rows()) % grid.rows();
        break;
      case "ArrowDown":
        newRow = (newRow + 1) % grid.rows();
        break;
    }

    newPositions.push({ row: newRow, col: newCol });
  }

  for (let i = 0; i < newPositions.length; i++) {
    const newPosition = newPositions[i];
    blockCells.get(i).data.row = newPosition.row;
    blockCells.get(i).data.col = newPosition.col;

    grid.set(newPosition.row, newPosition.col, block.type);
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
