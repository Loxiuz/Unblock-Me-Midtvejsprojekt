export default class Block {
    static nextId = 1;

    constructor (length, direction, isPlayer) {
        this.length = length; //int
        this.id = Block.nextId++;
        this.direction = direction; //String
        this.isPlayer = isPlayer;
    }

}