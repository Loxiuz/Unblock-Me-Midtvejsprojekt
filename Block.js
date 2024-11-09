export default class Block {
  static nextId = 1;

  constructor(direction, type, cells) {
    this.id = Block.nextId++;
    this.direction = direction; //String
    this.type = type;
    this.cells = cells;
  }
}
