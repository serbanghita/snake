import Game from "../Game";
import Scene from "./Scene";

export default class GameImpl extends Game {
    constructor(private scene: Scene) {
        super();
        this.onInit();
    }

    onInit() {
        this.scene.renderCanvas();
        this.scene.renderGrid(this.state.board);
    }

    onStart() {
        this.scene.renderSnake(this.snake);
    }

    onAfterMove() {
        if (this.snake.head.tile !== this.snake.head.oldTile) {
            this.scene.clearTile(this.snake.head.oldTile);
        }
        this.scene.renderSnake(this.snake);
    }

    onAfterGenerateFruit(tileIndex:number) {
        this.scene.renderFruit(tileIndex);
    }
}