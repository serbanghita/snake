import System from "../../System";
import Entity from "../../Entity";
import Body from "../component/Body";
import Fruit from "../component/Fruit";
import Obstacle from "../component/Obstacle";
import PositionOnGrid from "../component/PositionOnGrid";
import World from "../../World";
import GridSystem from "./GridSystem";

interface IRenderProps {
    canvasName: string;
    appendTo: HTMLElement;
    fps: number;
}

export default class RenderSystem extends System {
    private readonly ctx: CanvasRenderingContext2D;
    private screen: Entity;

    constructor(protected world: World, public properties: IRenderProps) {
        super(world, properties);
        this.ctx = this.createCanvas(properties.canvasName, properties.appendTo);
    }

    public loadScreen(screen: Entity) {
        this.screen = screen;
    }

    public update(now: number, entities: Entity[]) {
        if (this.fps > 0) {
            const check = this.isFrequencySatisfied(now);
            if (!check) {
                return false;
            }
        }

        console.log(`RenderSystem update`);

        this.clearRectangle(this.screen);

        entities.forEach((entity) => {
            this.renderRectangle(entity);
        });
    }

    private createCanvas(canvasName: string, appendTo: HTMLElement): CanvasRenderingContext2D {
        const props = this.properties;

        const $canvas = document.createElement('canvas');
        $canvas.id = canvasName;
        $canvas.width = 600;
        $canvas.height = 480;
        $canvas.style.width = `600px`;
        $canvas.style.height = `480px`;
        $canvas.style.border = `1px solid black`;
        $canvas.style.imageRendering = "pixelated";

        const canvasCtx = $canvas.getContext("2d") as CanvasRenderingContext2D;

        appendTo.appendChild($canvas);

        return canvasCtx;
    }

    private clearRectangle(entity: Entity) {
        const ctx = this.ctx;
        const position = entity.getComponent(PositionOnGrid);
        const body = entity.getComponent(Body);

        const gridSystem = this.world.getSystem(GridSystem);

        const positionOnScreen = gridSystem.getXYFromTileIndex(position.properties.tile);

        ctx.clearRect(
            positionOnScreen.x,
            positionOnScreen.y,
            positionOnScreen.x + body.properties.width,
            positionOnScreen.y + body.properties.height
        );
    }

    private renderRectangle(entity: Entity) {
        const ctx = this.ctx;
        const position = entity.getComponent(PositionOnGrid);
        const body = entity.getComponent(Body);

        ctx.save();
        // ctx.beginPath();
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = "blue";
        // ctx.rect(position.properties.x, position.properties.y, body.properties.width, body.properties.height);
        // if (fillColor) {
        //     ctx.fillStyle = fillColor;
        //     ctx.fillRect(x, y, width, height);
        // }

        let fillStyle = "black";
        if (entity.hasComponent(Fruit)) {
            fillStyle = "green";
        } else if (entity.hasComponent(Obstacle)) {
            fillStyle = "red";
        }

        ctx.fillStyle = fillStyle;
        const gridSystem = this.world.getSystem(GridSystem);

        const positionOnScreen = gridSystem.getXYFromTileIndex(position.properties.tile);
        ctx.fillRect(positionOnScreen.x, positionOnScreen.y, body.properties.width, body.properties.height);

        // ctx.stroke();
        // ctx.closePath();
        ctx.restore();
    }
}