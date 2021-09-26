import Engine from "./ecs/Engine";
import Position from "./ecs/impl/component/Position";
import Body from "./ecs/impl/component/Body";
import Velocity from "./ecs/impl/component/Velocity";
import Score from "./ecs/impl/component/Score";
import Renderable from "./ecs/impl/component/Renderable";
import Keyboard from "./ecs/impl/component/Keyboard";
import RenderSystem from "./ecs/impl/system/RenderSystem";
import KeyboardControlSystem from "./ecs/impl/system/KeyboardControlSystem";

const engine = new Engine();
const world = engine.createWorld();

const snake = world.createEntity();
snake.addComponent(Position, {x: 10, y: 10});
snake.addComponent(Body, {width: 2, height: 2});
snake.addComponent(Velocity, {x: 1, y: 1});
snake.addComponent(Score, {fruitsEaten: 0});
snake.addComponent(Renderable);
snake.addComponent(Keyboard, {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight"
});

const fruit = world.createEntity();
fruit.addComponent(Position, {x: 20, y: 20});
fruit.addComponent(Body, {width: 2, height: 2});
fruit.addComponent(Renderable);

const queryAllRendered = world.createQuery({
    all: [Renderable]
});

const queryAllWithKeyboard = world.createQuery({
    all: [Renderable, Keyboard]
});

const renderSystem = world.addSystem(RenderSystem, {canvasName: 'canvas', appendTo: document.body});
const keyboardSystem = world.addSystem(KeyboardControlSystem, {});

const loop = (dt) => {
    keyboardSystem.update(queryAllWithKeyboard);
    renderSystem.update(queryAllRendered);
    window.requestAnimationFrame(loop);
};

loop(0);