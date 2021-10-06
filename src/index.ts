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
import Grid, {IGridProps} from "./ecs/impl/component/Grid";
import {getTileFromXY} from "./ecs/utils";
import Obstacle from "./ecs/impl/component/Obstacle";

enum TileType {
    FREE = 0,
    SNAKE = 1,
    OBSTACLE = 2
}

const TILE_SIZE = 8;
const WIDTH_IN_TILES = 80;
const HEIGHT_IN_TILES = 60;
const WIDTH_IN_PX = 640;
const HEIGHT_IN_PX = 480;
const BLOCKED_TILES_VALUES = [TileType.SNAKE, TileType.OBSTACLE];


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
    fps: 1
});

// ------------------------------------
// Entities
// ------------------------------------
const map = world.createEntity();
const mapProperties: IGridProps = {
    tileSize: TILE_SIZE,
    widthInTiles: WIDTH_IN_TILES,
    heightInTiles: HEIGHT_IN_TILES,
    widthInPx: WIDTH_IN_PX,
    heightInPx: HEIGHT_IN_PX,
    blockedTilesValues: BLOCKED_TILES_VALUES,
    // Naive flat grid.
    gridAsArray: Array(WIDTH_IN_TILES * HEIGHT_IN_TILES).fill(0)
};
map.addComponent(Grid, mapProperties);

const snake = world.createEntity();
snake.addComponent(Position, {x: 8, y: 8});
snake.addComponent(PositionOnGrid, {tile: getTileFromXY(8, 8, mapProperties), tileType: TileType.SNAKE});
snake.addComponent(Body, {width: 8, height: 8});
snake.addComponent(Velocity, {x: 8, y: 8});
snake.addComponent(Score, {fruitsEaten: 0});
snake.addComponent(Renderable);
snake.addComponent(Keyboard, {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight"
});

const obstacle = world.createEntity();
obstacle.addComponent(Position, {x: 8 * 8, y: 8});
obstacle.addComponent(PositionOnGrid, {tile: getTileFromXY(8 * 8, 8, mapProperties), tileType: TileType.OBSTACLE});
obstacle.addComponent(Body, {width: 8, height: 8});
obstacle.addComponent(Renderable);
obstacle.addComponent(Obstacle);

const fruit = world.createEntity();
fruit.addComponent(Position, {x: 16, y: 16});
fruit.addComponent(PositionOnGrid, {tile: getTileFromXY(16, 16, mapProperties), tileType: TileType.FREE});
fruit.addComponent(Body, {width: 8, height: 8});
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
gridSystem.addMap(map);
gridSystem.initEntities(allEntitiesOnGrid);

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