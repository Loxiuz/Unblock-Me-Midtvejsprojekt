import * as model from "./boardModel.js";
export { isBlocked, solve };

let å = 0;
function solve(block, grid) {
  å++;
  if (å > 20) return;
  const head = block.cells.tail.data;
  const blocks = model.getBlocks();
  //console.log("IM HERE")
  // const blocks = model.getBlocks();
  if (block.id === 0 && (head.row === 2 && head.col === 5)) {
    console.log("GOOOOAAAL");
    return true; // todo: RETURN TRUE??
  }

  //console.log(!isBlocked(blocks[0], "right"));
  if (!isBlocked(blocks[0], "right")) {
    model.move("ArrowRight", blocks[0]);
    return solve(blocks[0], grid);
  } else {
    console.log("IS BLOCKED")
  }

  for (let blockId in blocks) {
    if (blockId === 0) continue;

    const block = blocks[blockId];
    const directions = block.direction === "horizontal" ? ["ArrowLeft", "ArrowRight"] : ["ArrowUp", "ArrowDown"];

    for (let direction of directions) {
      if (!isBlocked(block, direction)) {
        //const originalPosition = {"row": head.row, "col": head.col};

        model.move(direction, block);

        const result = solve(block, grid);
        if (result) return result;
      }
    }
  }

  return false;
}

function isBlocked(block, direction) {
  const blockTail = block.cells.tail.data;
  const blockHead = block.cells.head.data;

  switch (direction) {
    case "left":
      console.log("LOOKING LEFT");
      return model.readFromCell(blockHead.row, blockHead.col - 1) != 0;
    case "right":
      console.log("LOOKING RIGHT");
      return model.readFromCell(blockTail.row, blockTail.col + 1) != 0;
    case "up":
      console.log("LOOKING UP");
      return model.readFromCell(blockHead.row - 1, blockHead.col) != 0;
    case "down":
      console.log("LOOKING DOWN");
      return model.readFromCell(blockTail.row + 1, blockTail.col) != 0;
  }
}
