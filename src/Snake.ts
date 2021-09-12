import SnakeTile from "./SnakeTile";
import {DIRECTION, GameState} from "./Game";

export default class Snake {
    // Reference to the head.
    public head: SnakeTile;
    public body: SnakeTile[] = [];

    constructor(gameState: GameState, startTileIndex: number, direction: DIRECTION) {
        this.head = new SnakeTile(gameState, direction, startTileIndex, true);
        this.body = [];
    }

    update(direction: DIRECTION) {
        const moved = this.head.updateWithDirection(direction);
        if (moved && this.body.length > 0) {
            // @todo: Update the rest of the body.
            return true;
        }

        return false;
    }
}