import Game, {DIRECTION} from "./Game";

const game = new Game()
game.start();

// tslint:disable-next-line:no-string-literal
window["game"] = {
    move: game.move.bind(game),
    DIRECTION: DIRECTION,
    state: game.state,
};