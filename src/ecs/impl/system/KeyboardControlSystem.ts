import System from "../../System";
import Entity from "../../Entity";
import World from "../../World";
import Direction, {DIRECTION} from "../component/Direction";
import Keyboard from "../component/Keyboard";

// tslint:disable-next-line:no-empty-interface
interface IKeyboardControlSystem {
    fps: number;
}

// This system listens and stores only the last key pressed.
export default class KeyboardControlSystem extends System {
    private keyPressed: string;

    public constructor(protected world: World, public properties: IKeyboardControlSystem) {
        super(world, properties);
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
            // console.log("key update");
        }

        entities.forEach((entity) => {
            const keyboard = entity.getComponent(Keyboard);
            const direction = entity.getComponent(Direction);

            switch (this.keyPressed) {
                case keyboard.properties.UP:
                    direction.properties.direction = DIRECTION.UP;
                    break;
                case keyboard.properties.DOWN:
                    direction.properties.direction = DIRECTION.DOWN;
                    break;
                case keyboard.properties.LEFT:
                    direction.properties.direction = DIRECTION.LEFT;
                    break;
                case keyboard.properties.RIGHT:
                    direction.properties.direction = DIRECTION.RIGHT;
                    break;
            }
        });
    }
}