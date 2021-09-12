import Game, {DIRECTION} from "./Game";
import {convertBoardFromFlatToMatrix} from "./utils";

const game = new Game()
game.start();

console.log(convertBoardFromFlatToMatrix(game.state.board));

// tslint:disable-next-line:no-string-literal
window["game"] = {
    move: game.move.bind(game),
    DIRECTION: DIRECTION,
    state: game.state,
};