import {
    convertBoardFromFlatToMatrix,
    createBoard,
    isTileOccupied,
    isTileOutsideTheBoard
} from "./utils";
import SnakeTile from "./SnakeTile";

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

export interface GameState {
    // Snake is represented by an array of SnakeTiles.
    snake: SnakeTile[];
    // Board matrix represented as a flat array.
    board: number[];
    // The result of the game.
    result: GameResult;
}

export default class Game {
    public static BOARD_SIZE: number = 10;
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
        console.log(`Game started.`);
        const state = this.state;
        // By default start in the middle of the board.
        const startTile = (Game.BOARD_SIZE * Game.BOARD_SIZE) / 2 + Game.BOARD_SIZE / 2;
        state.snake.push(
            new SnakeTile(state, DIRECTION.NONE, startTile, true)
        );

        state.board[startTile] = Entity.SNAKE;
    }

    public move(direction: DIRECTION) {
        const state = this.state;

        if (state.result !== GameResult.PLAYING) {
            console.log(`Game has finished.`);
            return false;
        }

        const snakeHead = this.state.snake[0];
        const oldTile = snakeHead.tile;
        const hasMoved = snakeHead.updateWithDirection(direction);

        if (!hasMoved) {
            state.result = GameResult.LOSE;
            console.log(`Game lost!`);
        }

        state.board[oldTile] = Entity.EMPTY;
        state.board[snakeHead.tile] = Entity.SNAKE;
        console.log(`Snake has moved`, convertBoardFromFlatToMatrix(state.board));
    }

    public reset() {
        this.state = {
            snake: [],
            board: createBoard(),
            result: GameResult.PLAYING
        }
    }

}