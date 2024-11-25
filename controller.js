//import Block from "./Block.js";
import * as model from "./boardModel.js";
import * as view from "./view.js";
import Queue from "./queue.js";
import * as solver from "./solver.js";

window.addEventListener("load", start);

let rows = 6;
let cols = 6;
let currDirection = "";
let prevDirection = ""; // Should maybe be in board model.
let block; // selected block
let blocks = [];
let cellEventListeners = [];

async function start() {
  console.log(`Javascript kører`);

  document.addEventListener("keydown", keydown);

  model.makeGrid(rows, cols);
  //console.log(model.makeGrid("CONTROLLER, MODEL.MAKEGRID FUNCTION" + rows, cols))
  view.createBoard(rows, cols);
  await setLevel();
  view.displayBoard(rows, cols);
  blockListener();
}

async function setLevel() {
  const response = await fetch("level.json");
  const data = await response.json();
  blocks = data.blocks;

  for (let i = 0; i < data.blocks.length; i++) {
    const cells = data.blocks[i].cells;
    const queue = new Queue();

    for (let j = 0; j < cells.length; j++) {
      queue.enqueue(cells[j]);
    }

    data.blocks[i].cells = queue;

    model.writeBlockToCells(data.blocks[i]);
  }
}

function keydown(event) {
  // console.log(event);
  currDirection = event.key;

  if (block) {
    if (!prevDirection) {
      if (block.direction === "horizontal") {
        prevDirection = "ArrowRight";
      } else if (block.direction === "vertical") {
        prevDirection = "ArrowDown";
      }
    }
    moveBlockByArrowKey(block);
  }
}

function blockListener() {
  const cells = document.querySelectorAll("#grid .cell");

  cellEventListeners.forEach(({ cell, listener }) => {
    cell.removeEventListener("click", listener);
  });

  cellEventListeners = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const index = row * cols + col;
      if (
        model.readFromCell(row, col) === 2 ||
        model.readFromCell(row, col) === 1
      ) {
        const listener = (e) => {
          e.preventDefault();
          prevDirection = "";
          currDirection = "";
          setSelectedBlock(getBlockId({ row: row, col: col }));
        };

        cells[index].addEventListener("click", listener);

        // Store the cell and listener reference
        cellEventListeners.push({ cell: cells[index], listener });
      }
    }
  }
}

function getBlockId(coords) {
  for (let i = 0; i < blocks.length; i++) {
    const cells = blocks[i].cells;
    for (let j = 0; j < cells.length; j++) {
      const cellData = cells.get(j).data;
      if (cellData.row === coords.row && cellData.col === coords.col) {
        return i;
      }
    }
  }
}

function setSelectedBlock(blockId) {
  block = model.getBlocks()[blockId];

  console.log(block);
  // console.log("GRID IN CONTROLLER: " + model.getGrid().grid);
  // console.log("Is blocked is = ", solver.isBlocked(block, model.getGrid()));
  // console.log(blockId);
}

function moveBlockByArrowKey(block) {
  model.move(currDirection, block);
  console.log(prevDirection);
  if (currDirection !== prevDirection) {
    for (let i = 0; i < block.cells.size() - 1; i++) {
      model.move(currDirection, block);
    }
  }
  prevDirection = currDirection;

  view.displayBoard(rows, cols);
  // evt. setTimeout??

  blockListener();
}

//TODO - Main focus: Make the blocks move
/* 
Done: 
    - Maybe convert the block cells into queues to get same functionallity as in snake to move blocks
    - Make the "goal"; a missing wall 

TODO:
    - Note for how to move the blocks: Click on cell to move, click on where to move it = cell moves
*/
