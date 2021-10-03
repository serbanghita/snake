import Engine from "./ecs/Engine";
import Position from "./ecs/impl/component/Position";
import Body from "./ecs/impl/component/Body";
import Velocity from "./ecs/impl/component/Velocity";
import Score from "./ecs/impl/component/Score";
import Renderable from "./ecs/impl/component/Renderable";
import Keyboard from "./ecs/impl/component/Keyboard";
import RenderSystem from "./ecs/impl/system/RenderSystem";
import KeyboardControlSystem from "./ecs/impl/system/KeyboardControlSystem";
import Fruit from "./ecs/impl/component/Fruit";
import GridSystem from "./ecs/impl/system/GridSystem";
import PositionOnGrid from "./ecs/impl/component/PositionOnGrid";
import MapGrid from "./ecs/impl/component/MapGrid";

const TILE_SIZE = 8;
const WIDTH_IN_TILES = 80;
const HEIGHT_IN_TILES = 60;
const WIDTH_IN_PX = 640;
const HEIGHT_IN_PX = 480;


const engine = new Engine();
const world = engine.createWorld();

// ------------------------------------
// Systems
// ------------------------------------
const renderSystem = world.addSystem(RenderSystem, {
    canvasName: 'canvas',
    appendTo: document.body,
    fps: 30
});
const keyboardSystem = world.addSystem(KeyboardControlSystem, {
    fps: 24
});
const gridSystem = world.addSystem(GridSystem, {
    fps: 24
});

// ------------------------------------
// Entities
// ------------------------------------
const grid = world.createEntity();
grid.addComponent(MapGrid, {
    tileSize: TILE_SIZE,
    widthInTiles: WIDTH_IN_TILES,
    heightInTiles: HEIGHT_IN_TILES
});

const snake = world.createEntity();
snake.addComponent(Position, {x: 10, y: 10});
snake.addComponent(PositionOnGrid, {tile: 1});
snake.addComponent(Body, {width: 4, height: 4});
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
fruit.addComponent(PositionOnGrid, {tile: 2});
fruit.addComponent(Body, {width: 4, height: 4});
fruit.addComponent(Renderable);
fruit.addComponent(Fruit, {type: "apple"});

const screen = world.createEntity();
screen.addComponent(Position, {x: 0, y: 0});
screen.addComponent(Body, {width: 640, height: 480});

// ------------------------------------
// Queries
// ------------------------------------
const allEntitiesToRender = world.createQuery({
    all: [Renderable]
});

const allEntitiesWithKeyboard = world.createQuery({
    all: [Renderable, Keyboard]
});

const allEntitiesOnGrid = world.createQuery({
    all: [PositionOnGrid]
})

// ------------------------------------
// Link Entities to Services.
// ------------------------------------
renderSystem.setScreen(screen);
gridSystem.addMapGrid(grid);

// ------------------------------------
// Loop
// ------------------------------------
const loop = (now) => {
    keyboardSystem.update(now, allEntitiesWithKeyboard);
    gridSystem.update(now, allEntitiesOnGrid);
    renderSystem.update(now, allEntitiesToRender);
    window.requestAnimationFrame(loop);
};

loop(0);