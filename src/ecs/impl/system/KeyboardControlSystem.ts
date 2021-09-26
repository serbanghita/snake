import System from "../../System";
import Entity from "../../Entity";
import Position from "../component/Position";
import Velocity from "../component/Velocity";
import Keyboard from "../component/Keyboard";

// tslint:disable-next-line:no-empty-interface
interface IKeyboardControlSystem {
}


export default class KeyboardControlSystem extends System {
    private keysPressed: Set<string> = new Set([]);

    public constructor(props: IKeyboardControlSystem) {
        super(props);
        this.bindEvents();
    }

    private bindEvents() {
        window.addEventListener("keydown", (e) => {
            if (this.keysPressed.has(e.code)) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            this.keysPressed.add(e.code);
        }, { capture: false });
        window.addEventListener("keyup", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.keysPressed.delete(e.code);
        }, { capture: false });
    }

    public keyPressed(key: string):boolean {
        return this.keysPressed.size > 0 && this.keysPressed.has(key);
    }

    private unbind() {
        // window.removeEventListener(eventName, listener, useCapture);
        // window.removeEventListener(eventName, listener, useCapture);
    }

    public update(entities: Entity[]) {
        entities.forEach((entity) => {
            const position = entity.getComponent(Position);
            const velocity = entity.getComponent(Velocity);
            const keyboard = entity.getComponent(Keyboard);

            if (this.keyPressed(keyboard.properties.UP)) {
                position.properties.y -= velocity.properties.y;
            } else if (this.keyPressed(keyboard.properties.DOWN)) {
                position.properties.y += velocity.properties.y;
            }

            if (this.keyPressed(keyboard.properties.LEFT)) {
                position.properties.x -= velocity.properties.x;
            } else if (this.keyPressed(keyboard.properties.RIGHT)) {
                position.properties.x += velocity.properties.x;
            }
        });
    }
}