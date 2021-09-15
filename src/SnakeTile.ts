import {isTileOccupied, isTileOutsideTheBoard} from "./utils";
import Game, {DIRECTION, Entity, GameState} from "./Game";

export default class SnakeTile {
    public direction: DIRECTION = DIRECTION.NONE;
    public tile: number = 0;
    public oldTile: number = 0;
    public isHead: boolean = false;

    constructor(private readonly gameState: GameState, direction, tile, isHead) {
        this.direction = direction;
        this.tile = tile;
        this.isHead = isHead;
    }

    updateWithPrev(previous: SnakeTile) {
        this.direction = previous.direction;
        this.tile = previous.tile;
    }

    updateWithDirection(direction: DIRECTION) {
        this.direction = direction;
        let futureTile;
        switch(direction) {
            case DIRECTION.UP:
                futureTile = this.tile - Game.BOARD_SIZE;
                break;
            case DIRECTION.DOWN:
                futureTile = this.tile + Game.BOARD_SIZE;
                break;
            case DIRECTION.LEFT:
                futureTile = this.tile - 1;
                break;
            case DIRECTION.RIGHT:
                futureTile = this.tile + 1;
                break;
        }

        if (isTileOccupied(futureTile, this.gameState.board) || isTileOutsideTheBoard(futureTile)) {
            return false;
        }

        if (this.gameState.board[futureTile] === Entity.FRUIT) {
            // Snake grows.
        }

        this.oldTile = this.tile;
        this.tile = futureTile;

        return true;
    }
}