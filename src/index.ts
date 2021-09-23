import Component from "./ecs/Component";
import Engine from "./ecs/Engine";
import System from "./ecs/System";
import Entity from "./ecs/Entity";

class Position extends Component {
    public properties: {
        x: number
        y: number
    };

    constructor(props) {
        super(props);
    }
}

// tslint:disable-next-line:max-classes-per-file
class Velocity extends Component {
    public properties: {
        x: number
        y: number
    };
    constructor(props) {
        super(props);
    }
}

// tslint:disable-next-line:max-classes-per-file
class Score extends Component {
    public properties: {
        fruitsEaten: 0
    };
    constructor(props) {
        super(props);
    }
}

class Keyboard {
    public static keyPressed(key: string): boolean {
        return false;
    }
}

class KeyboardControlSystem extends System {
    public update(entity: Entity) {

        const position = entity.getComponent('Position') as Position;
        const velocity = entity.getComponent('Velocity') as Velocity;

        if (Keyboard.keyPressed('UP')) {
            position.properties.y -= velocity.properties.y;
        }

        if (Keyboard.keyPressed('DOWN')) {
            position.properties.y += velocity.properties.y;
        }

        if (Keyboard.keyPressed('LEFT')) {
            position.properties.x -= velocity.properties.x;
        }

        if (Keyboard.keyPressed('RIGHT')) {
            position.properties.x += velocity.properties.x;
        }

    }
}

const engine = new Engine();
engine.registerComponent(Position);
engine.registerComponent(Velocity);

const snake = engine.createEntity();
snake.addComponent(Position, {x: 10, y: 10});
snake.addComponent(Velocity, {x: 1, y: 1});
snake.addComponent(Score, {fruitsEaten: 0});


// switch (eventName) {
//     case "MOVE_LEFT":
//         break;
//     case "MOVE_RIGHT":
//         break;
//     case "MOVE_UP":
//         break;
//     case "MOVE_DOWN":
//         break;
// }