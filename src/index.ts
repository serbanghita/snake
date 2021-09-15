import Game, {DIRECTION} from "./Game";
import {convertBoardFromFlatToMatrix} from "./utils";
import GameImpl from "./dom/GameImpl";
import Scene from "./dom/Scene";

const game = new GameImpl(new Scene())
game.start();

console.log(convertBoardFromFlatToMatrix(game.state.board));

// tslint:disable-next-line:no-string-literal
window["game"] = {
    move: game.move.bind(game),
    generateFruit: game.generateFruit.bind(game),
    DIRECTION,
    state: game.state,
};