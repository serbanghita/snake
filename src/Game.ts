import {createBoard, isTileOccupied, isTileOutsideTheBoard} from "./utils";

export enum Entity {
    EMPTY = 0,
    BLOCKED = 1,
    SNAKE = 2,
    FRUIT = 3
}

enum GameResult {
    PLAYING = 0,
    WIN = 1,
    LOSE = 2
}

export enum DIRECTION {
    NONE = 0,
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4
}

interface GameState {
    // Snake is represented by an array of SnakeTiles.
    snake: SnakeTile[];
    // Board matrix represented as a flat array.
    board: number[];
    // The result of the game.
    result: GameResult;
}

class SnakeTile {
    public direction: DIRECTION = DIRECTION.NONE;
    public tile: number = 0;
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
                futureTile = this.tile + Game.BOARD_SIZE;
                break;
            case DIRECTION.DOWN:
                futureTile = this.tile - Game.BOARD_SIZE;
                break;
            case DIRECTION.LEFT:
                futureTile = this.tile - 1;
                break;
            case DIRECTION.RIGHT:
                futureTile = this.tile + 1;
                break;
        }

        if (isTileOccupied(futureTile, this.gameState.board) || isTileOutsideTheBoard(futureTile)) {
            this.gameState.result = GameResult.LOSE;
            return false;
        }

        this.tile = futureTile;

        return true;
    }
}

export default class Game {
    public static BOARD_SIZE: number = 10;
    // @todo Keep matrix operational for visual debug.
    public static BOARD_MATRIX: number[][] = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];


    public state: GameState = {
        snake: [],
        board: createBoard(),
        result: GameResult.PLAYING
    };

    public start() {
        const state = this.state;
        console.log("Game started", state.board);
        // By default start in the middle.
        const startTile = (Game.BOARD_SIZE * Game.BOARD_SIZE) / 2;
        state.snake.push(
            new SnakeTile(state, DIRECTION.NONE, startTile, true)
        );
    }

    public move(direction: DIRECTION) {
        const state = this.state;

        if (state.result !== GameResult.PLAYING) {
            return false;
        }

        const snakeHead = this.state.snake[0];
        const oldTile = snakeHead.tile;
        const hasMoved = snakeHead.updateWithDirection(direction);

        if (hasMoved) {
            state.board[oldTile] = Entity.EMPTY;
            console.log("Snake has moved", state.board);
        }
    }

    public reset() {
        this.state = {
            snake: [],
            board: createBoard(),
            result: GameResult.PLAYING
        }
    }

}