import Game, {Entity} from "../Game";
import Snake from "../Snake";

export default class Scene {
    private $canvas: HTMLElement;
    public $startBtn: HTMLElement;
    public $announcements: HTMLElement;

    private static TILE_SIZE = 32;

    renderCanvas() {
        const elem = document.createElement("div");
        elem.style.position = "relative";
        elem    .style.textAlign = "center";
        elem.style.width = `${Game.BOARD_SIZE * Scene.TILE_SIZE}px`;
        elem.style.height = `${Game.BOARD_SIZE * Scene.TILE_SIZE}px`;

        this.$canvas = elem;
        document.body.appendChild(elem);
    }

    renderGridInit(grid: number[]) {
        for (let i = 0; i < grid.length; i++) {
            const $tile = document.createElement("div");
            $tile.style.float = "left";
            $tile.style.width = `${Scene.TILE_SIZE}px`;
            $tile.style.height = `${Scene.TILE_SIZE}px`;
            $tile.style.border = "1px solid #ccc";
            $tile.style.boxShadow = "0 0 0 1px #ccc";
            $tile.style.boxSizing = "border-box";
            $tile.id = `box-${i}`;
            $tile.className = "box";
            $tile.dataset.index = `${i}`;
            this.$canvas.appendChild($tile);
        }
    }

    renderGrid(grid: number[]) {
        for (let i = 0; i < grid.length; i++) {
            const $tile = document.getElementById(`box-${i}`) as HTMLElement;
            if (grid[i] === Entity.BLOCKED) {
                $tile.style.background = "black";
            } else if (grid[i] === Entity.FRUIT) {
                $tile.style.background = "green";
            }
        }
    }

    renderSnake(snake: Snake) {
        const $tile = document.getElementById(`box-${snake.head.tile}`) as HTMLElement;
        $tile.style.backgroundColor = "blue";
        snake.body.forEach((bodyTile) => {
            const $bodyTile = document.getElementById(`box-${bodyTile.tile}`) as HTMLElement;
            $bodyTile.style.backgroundColor = "blue";
        });
    }

    renderFruit(tileIndex: number) {
        const $tile = document.getElementById(`box-${tileIndex}`) as HTMLElement;
        $tile.style.backgroundColor = "green";
    }

    clearTile(tileIndex: number) {
        const $tile = document.getElementById(`box-${tileIndex}`) as HTMLElement;
        $tile.style.backgroundColor = "";
    }

    public renderAnnouncements(text: string) {
        const elem = document.createElement("div");
        elem.style.display = "absolute";
        elem.style.padding = "1em";
        elem.style.fontStyle = "italics";
        elem.innerText = text;

        this.$announcements = elem;
        this.$canvas.appendChild(this.$announcements);
    }

    public removeAnnouncements() {
        return this.$announcements && this.$announcements.remove();
    }

    public renderStartButton() {
        const elem = document.createElement("button");
        elem.style.display = "absolute";
        elem.innerText = "Re-start game";
        elem.style.marginTop = "1em";
        elem.style.userSelect = "none";
        elem.style.cursor = "pointer";

        this.$startBtn = elem;
        this.$canvas.appendChild(this.$startBtn);
    }

    public reset() {
        this.removeAnnouncements();
        this.$canvas.querySelectorAll(".box").forEach(($box: HTMLElement) => {
            $box.style.backgroundColor = "";
        });
    }
}