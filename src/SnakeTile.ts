import {DIRECTION} from "./Game";

export default class SnakeTile {


    constructor(
        public direction: DIRECTION = DIRECTION.NONE,
        public tile: number = 0,
        public oldTile: number = 0
    ) {
        this.direction = direction;
        this.tile = tile;
        this.oldTile = tile;
    }
}