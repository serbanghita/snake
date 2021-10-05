import System from "../../System";
import Entity from "../../Entity";
import Position from "../component/Position";
import Velocity from "../component/Velocity";
import Keyboard from "../component/Keyboard";

// tslint:disable-next-line:no-empty-interface
interface IKeyboardControlSystem {
    fps: number;
}

// This system listens and stores only the last key pressed.
export default class KeyboardControlSystem extends System {
    private keyPressed: string;

    public constructor(props: IKeyboardControlSystem) {
        super(props);
        this.bindEvents();
    }

    private bindEvents() {
        window.addEventListener("keydown", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.keyPressed = e.code;
        }, { capture: false });
    }

    public getKeyPressed():string {
        return this.keyPressed;
    }

    private unbind() {
        // window.removeEventListener(eventName, listener, useCapture);
        // window.removeEventListener(eventName, listener, useCapture);
    }

    public update(now, entities: Entity[]) {

        if (this.fps > 0) {
            const check = this.isFrequencySatisfied(now);
            if (!check) {
                return false;
            }
        }

        entities.forEach((entity) => {
            const position = entity.getComponent(Position);
            const velocity = entity.getComponent(Velocity);
            const keyboard = entity.getComponent(Keyboard);

            switch (this.keyPressed) {
                case keyboard.properties.UP:
                    position.properties.yFuture = position.properties.y - velocity.properties.y;
                    break;
                case keyboard.properties.DOWN:
                    position.properties.yFuture = position.properties.y + velocity.properties.y;
                    break;
                case keyboard.properties.LEFT:
                    position.properties.xFuture = position.properties.x - velocity.properties.x;
                    break;
                case keyboard.properties.RIGHT:
                    position.properties.xFuture = position.properties.x + velocity.properties.x;
                    break;
            }

        });
    }
}