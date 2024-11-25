import * as model from "./boardModel.js";
export { canMove as isBlocked, solve };

let a = 0;
async function solve(block, grid) {
  a++;
  if (a > 50) return;

  const tail = block.cells.tail.data;
  const blocks = model.getBlocks();
  if (block.id === 0 && tail.row === 2 && tail.col === 5) {
    console.log("GOOOOAAAL");
    return true;
  }
  if (canMove(blocks[0], "ArrowRight")) {
    model.move("ArrowRight", blocks[0]);
    return solve(blocks[0], grid);
  } else {
    console.log("IS BLOCKED");
  }

  for (let i = 0; i < blocks.length; i++) {
    const currBlock = blocks[i];
    const directions =
      currBlock.direction === "horizontal"
        ? ["ArrowLeft", "ArrowRight"]
        : ["ArrowUp", "ArrowDown"];

    for (let direction of directions) {
      if (canMove(currBlock, direction)) {
        model.move(direction, currBlock);

        return solve(currBlock, grid);
      }
    }
  }

  return false;
}

function isWithinGrid(cell) {
  const gridRows = model.getGrid().rows();
  const gridCols = model.getGrid().cols();

  return (
    cell.row > 0 &&
    cell.row < gridRows - 1 &&
    cell.col > 0 &&
    cell.col < gridCols - 1
  );
}

function canMove(block, direction) {
  const blockTail = block.cells.tail.data;
  const blockHead = block.cells.head.data;

  console.log("Block Head", blockHead);
  console.log("Block Tail", blockTail);

  //Check if within grid

  if (isWithinGrid(blockTail) && isWithinGrid(blockHead)) {
    switch (direction) {
      case "ArrowLeft":
        console.log("LOOKING LEFT");
        return model.readFromCell(blockHead.row, blockHead.col - 1) === 0;
      case "ArrowRight":
        console.log("LOOKING RIGHT");
        return model.readFromCell(blockTail.row, blockTail.col + 1) === 0;
      case "ArrowUp":
        console.log("LOOKING UP");
        return model.readFromCell(blockHead.row - 1, blockHead.col) === 0;
      case "ArrowDown":
        console.log("LOOKING DOWN");
        return model.readFromCell(blockTail.row + 1, blockTail.col) === 0;
    }
  }
}
