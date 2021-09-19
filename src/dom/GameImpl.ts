import Game from "../Game";
import Scene from "./Scene";

export default class GameImpl extends Game {
    constructor(private scene: Scene) {
        super();
        this.onInit();
    }

    onInit() {
        const scene = this.scene;
        const state = this.state;
        const api = this;

        scene.renderCanvas();
        scene.renderGridInit(state.board);
        scene.renderGrid(state.board);
        scene.renderStartButton();

        scene.$startBtn.addEventListener('click', () => {
            api.reset();
            scene.reset();
            api.start();
        });
    }

    onStart() {
        const scene = this.scene;
        const state = this.state;
        const snake = this.snake;
        const api = this;

        scene.renderGrid(state.board);
        scene.renderSnake(snake);

        for (let i = 0; i < 10; i++) {
            api.generateFruit();
        }
    }

    onLose() {
        const scene = this.scene;
        const state = this.state;

        scene.renderAnnouncements(`You lose. Your score is ${state.score}`);
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

    // onFruitEat() {
    //     this.state.score += 1;
    // }
}