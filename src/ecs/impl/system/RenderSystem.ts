import System from "../../System";
import Entity from "../../Entity";
import Position from "../component/Position";
import Body from "../component/Body";
import Fruit from "../component/Fruit";
import Obstacle from "../component/Obstacle";

interface IRenderProps {
    canvasName: string;
    appendTo: HTMLElement;
    fps: number;
}

export default class RenderSystem extends System {
    private readonly ctx: CanvasRenderingContext2D;
    private screen: Entity;

    constructor(props: IRenderProps) {
        super(props);
        this.ctx = this.createCanvas(props.canvasName, props.appendTo);
    }

    public setScreen(screen: Entity) {
        this.screen = screen;
    }

    public update(now: number, entities: Entity[]) {
        if (this.fps > 0) {
            const check = this.isFrequencySatisfied(now);
            if (!check) {
                return false;
            }
        }

        // console.log(`RenderSystem update`);

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
        const position = entity.getComponent(Position);
        const body = entity.getComponent(Body);

        ctx.clearRect(position.properties.x, position.properties.y, position.properties.x + body.properties.width, position.properties.y + body.properties.height);
    }

    private renderRectangle(entity: Entity) {
        const ctx = this.ctx;
        const position = entity.getComponent(Position);
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
        ctx.fillRect(position.properties.x, position.properties.y, body.properties.width, body.properties.height);

        // ctx.stroke();
        // ctx.closePath();
        ctx.restore();
    }
}