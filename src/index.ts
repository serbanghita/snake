import Component from "./ecs/Component";
import Engine from "./ecs/Engine";

class Position extends Component {
    public properties: {
        x: number
        y: number
    };
    constructor(props) {
        super(props);
    }

    notify(eventName: string, properties: {}) {
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

    notify(eventName: string, properties: {}) {
        // Increase speed when level changes.
        if (eventName === "LEVEL_HAS_CHANGED") {
            this.properties.x += 1;
            this.properties.y += 1;
        }
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

    notify(eventName: string, properties: {}) {
        if (eventName === "SNAKE_ATE_FRUIT") {
            this.properties.fruitsEaten += 1;
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