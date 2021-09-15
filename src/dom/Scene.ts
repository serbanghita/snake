import Game, {Entity} from "../Game";
import Snake from "../Snake";

export default class Scene {
    private $canvas: HTMLElement;
    private static TILE_SIZE = 32;

    renderCanvas() {
        const elem = document.createElement("div");
        elem.style.position = "relative";
        elem.style.width = `${Game.BOARD_SIZE * Scene.TILE_SIZE}px`;
        elem.style.height = `${Game.BOARD_SIZE * Scene.TILE_SIZE}px`;

        this.$canvas = elem;
        document.body.appendChild(elem);
    }

    renderGrid(grid: number[]) {
        for (let i = 0; i < grid.length; i++) {
            const $tile = document.createElement("div");
            $tile.style.float = "left";
            $tile.style.width = `${Scene.TILE_SIZE}px`;
            $tile.style.height = `${Scene.TILE_SIZE}px`;
            $tile.style.border = "1px solid #ccc";
            $tile.style.boxShadow = "0 0 0 1px #ccc";
            $tile.style.boxSizing = "border-box";
            $tile.id = `box-${i}`;
            $tile.dataset.index = `${i}`;

            if (grid[i] === Entity.BLOCKED) {
                $tile.style.background = "black";
            } else if (grid[i] === Entity.FRUIT) {
                $tile.style.background = "green";
            }

            this.$canvas.appendChild($tile);
        }
    }

    renderSnake(snake: Snake) {
        const $tile = document.getElementById(`box-${snake.head.tile}`) as HTMLElement;
        $tile.style.backgroundColor = "blue";
    }

    renderFruit(tileIndex: number) {
        const $tile = document.getElementById(`box-${tileIndex}`) as HTMLElement;
        $tile.style.backgroundColor = "green";
    }

    clearTile(tileIndex: number) {
        const $tile = document.getElementById(`box-${tileIndex}`) as HTMLElement;
        $tile.style.backgroundColor = "";
    }
}