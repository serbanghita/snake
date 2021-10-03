import {
    convertBoardFromFlatToMatrix,
    createBoard, getFreeBoardTiles,
    randomInt
} from "./utils";
import Snake from "./Snake";

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
    // Board matrix represented as a flat array.
    board: number[];
    // The result of the game.
    result: GameResult;
    // Number of fruits eaten.
    score: number;
}

export default abstract class Game {
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
        board: createBoard(),
        result: GameResult.PLAYING,
        score: 0
    };
    public snake: Snake;

    public abstract onInit();
    public abstract onStart();
    public abstract onAfterMove();
    public abstract onAfterGenerateFruit(tileIndex: number);
    public abstract onLose();

    public start() {
        console.log(`Game started.`);
        const state = this.state;
        // By default start in the middle of the board.
        const startTile = (Game.BOARD_SIZE * Game.BOARD_SIZE) / 2 + Game.BOARD_SIZE / 2;
        this.snake = new Snake(state, startTile, DIRECTION.NONE);

        state.board[startTile] = Entity.SNAKE;

        this.onStart();
    }

    public move(direction: DIRECTION) {
        const state = this.state;
        const snake = this.snake;

        if (state.result !== GameResult.PLAYING) {
            console.log(`Game has finished.`);
            return false;
        }

        const hasMoved = snake.updateWithDirection(direction);

        if (!hasMoved) {
            state.result = GameResult.LOSE;
            this.onLose();
            console.log(`Game lost!`);
        }

        console.log(`Snake has moved`, convertBoardFromFlatToMatrix(state.board));

        this.onAfterMove();
    }

    public generateFruit() {
        const state = this.state;

        const freeTiles = getFreeBoardTiles(state.board);
        const index = randomInt(0, freeTiles.length - 1);
        const freeTileIndex = freeTiles[index];

        state.board[freeTileIndex] = Entity.FRUIT;

        this.onAfterGenerateFruit(freeTileIndex);
    }

    public reset() {
        this.state = {
            board: createBoard(),
            result: GameResult.PLAYING,
            score: 0
        }
    }

}