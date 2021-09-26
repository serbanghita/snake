import System from "../../System";
import Entity from "../../Entity";
import Position from "../component/Position";
import Body from "../component/Body";

interface IRenderProps {
    canvasName: string;
    appendTo: HTMLElement;
}

export default class RenderSystem extends System {
    private readonly ctx: CanvasRenderingContext2D;

    constructor(public properties: IRenderProps) {
        super();
        this.ctx = this.createCanvas(properties.canvasName, properties.appendTo);
    }

    public update(entities: Entity[]) {
        entities.forEach((entity) => {
            this.renderRectangle(entity);
        });
    }

    private createCanvas(canvasName: string, appendTo: HTMLElement): CanvasRenderingContext2D {
        const props = this.properties;

        const $canvas = document.createElement('canvas');
        $canvas.id = canvasName;
        $canvas.style.width = `600px`;
        $canvas.style.height = `480px`;
        $canvas.style.border = `1px solid black`;
        $canvas.style.imageRendering = "pixelated";

        const canvasCtx = $canvas.getContext("2d") as CanvasRenderingContext2D;

        appendTo.appendChild($canvas);

        return canvasCtx;
    }

    private renderRectangle(entity: Entity) {
        const ctx = this.ctx;
        const position = entity.getComponent(Position);
        const body = entity.getComponent(Body);

        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.rect(position.properties.x, position.properties.y, body.properties.width, body.properties.height);
        // if (fillColor) {
        //     ctx.fillStyle = fillColor;
        //     ctx.fillRect(x, y, width, height);
        // }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}