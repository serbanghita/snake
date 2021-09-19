import SnakeTile from "./SnakeTile";
import Game, {DIRECTION, Entity, GameState} from "./Game";
import {isTileOccupied, isTileOutsideTheBoard} from "./utils";

export default class Snake {
    // Reference to the head.
    public head: SnakeTile;
    public body: SnakeTile[] = [];

    constructor(private readonly gameState: GameState, startTileIndex: number, direction: DIRECTION) {
        const tile = new SnakeTile(direction, startTileIndex);
        this.head = tile;
        this.body = [tile];
    }

    private computeFutureTileFromDirection(currentTile: number, direction: DIRECTION) {
        let futureTile;

        switch(direction) {
            case DIRECTION.UP:
                futureTile = currentTile - Game.BOARD_SIZE;
                break;
            case DIRECTION.DOWN:
                futureTile = currentTile + Game.BOARD_SIZE;
                break;
            case DIRECTION.LEFT:
                futureTile = currentTile - 1;
                break;
            case DIRECTION.RIGHT:
                futureTile = currentTile + 1;
                break;
        }

        return futureTile;
    }

    updateWithDirection(direction: DIRECTION) {
        const gameState = this.gameState;

        this.head.direction = direction;

        const futureTile = this.computeFutureTileFromDirection(this.head.tile, direction);

        if (isTileOccupied(futureTile, gameState.board) || isTileOutsideTheBoard(futureTile)) {
            return false;
        }

        // Eats a fruit.
        if (gameState.board[futureTile] === Entity.FRUIT) {
            // Snake grows.
            this.body.push(new SnakeTile(direction, futureTile, futureTile));
            // Update the head.
            this.head = this.body[0];
            // Update board state.
            gameState.board[futureTile] = Entity.SNAKE;
        } else {
            // Move the snake's body.
            if (this.body.length > 1) {
                const tailTile = this.body.pop();
                this.body.push(tailTile as SnakeTile);
            }

            // Update the head.
            this.head = this.body[0];
            this.head.oldTile = this.head.tile;
            this.head.tile = futureTile;

            gameState.board[this.head.oldTile] = Entity.EMPTY;
            gameState.board[this.head.tile] = Entity.SNAKE;
        }



        return true;
    }
}