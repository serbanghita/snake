import Engine from "./ecs/Engine";
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
import Obstacle from "./ecs/impl/component/Obstacle";
import Name from "./ecs/impl/component/Name";
import SnakeTiles from "./ecs/impl/component/SnakeTiles";
import GameMap from "./ecs/impl/component/GameMap";
import IsSnake from "./ecs/impl/component/IsSnake";
import Direction, {DIRECTION} from "./ecs/impl/component/Direction";

enum TileType {
    FREE = 0,
    SNAKE = 1,
    OBSTACLE = 2,
    FRUIT = 3
}

const TILE_SIZE = 8;
const WIDTH_IN_TILES = 80;
const HEIGHT_IN_TILES = 60;
const WIDTH_IN_PX = 640;
const HEIGHT_IN_PX = 480;
const BLOCKED_TILES_VALUES = [TileType.SNAKE, TileType.OBSTACLE];
const SNAKE_GROW_TILES_VALUES = [TileType.FRUIT];

const engine = new Engine();
const world = engine.createWorld();

// ------------------------------------
//
// Entities
//
// ------------------------------------
const currentMap = world.createEntity();
currentMap.addComponent(GameMap, {name: "The best snake map ever", author: "Gali"});
currentMap.addComponent(Grid, {
    tileSize: TILE_SIZE,
    widthInTiles: WIDTH_IN_TILES,
    heightInTiles: HEIGHT_IN_TILES,
    widthInPx: WIDTH_IN_PX,
    heightInPx: HEIGHT_IN_PX,
    blockedTilesValues: BLOCKED_TILES_VALUES,
    snakeGrowsTilesValues: SNAKE_GROW_TILES_VALUES,
    // Naive flat grid.
    gridAsArray: Array(WIDTH_IN_TILES * HEIGHT_IN_TILES).fill(0)
});

const snakeTiles = [350, 270, 190, 110, 30].map((tmpSnakeTile) => {
    const snakeTile = world.createEntity();
    snakeTile.addComponent(PositionOnGrid, {tile: tmpSnakeTile, tileType: TileType.SNAKE});
    snakeTile.addComponent(Body, {width: TILE_SIZE, height: TILE_SIZE});
    snakeTile.addComponent(Renderable);
    snakeTile.addComponent(Direction, {direction: DIRECTION.NONE});

    return snakeTile;
});

const snake = world.createEntity();
snake.addComponent(IsSnake, {});
snake.addComponent(PositionOnGrid, {tile: 0, tileType: TileType.FREE});
snake.addComponent(Name, {label: "Snake"});
snake.addComponent(Score, {fruitsEaten: 0});
snake.addComponent(SnakeTiles, {tiles: snakeTiles});
snake.addComponent(Velocity, {speed: 1});
snake.addComponent(Direction, {direction: DIRECTION.NONE});
snake.addComponent(Keyboard, {
    UP: "ArrowUp",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight"
});

const obstacle = world.createEntity();
obstacle.addComponent(PositionOnGrid, {tile: 120, tileType: TileType.OBSTACLE, mapWidthInTiles: WIDTH_IN_TILES, mapHeightInTiles: HEIGHT_IN_TILES, tileSize: TILE_SIZE});
obstacle.addComponent(Body, {width: TILE_SIZE, height: TILE_SIZE});
obstacle.addComponent(Renderable);
obstacle.addComponent(Obstacle);

const fruit = world.createEntity();
fruit.addComponent(PositionOnGrid, {tile: 260, tileType: TileType.FREE, mapWidthInTiles: WIDTH_IN_TILES, mapHeightInTiles: HEIGHT_IN_TILES, tileSize: TILE_SIZE});
fruit.addComponent(Body, {width: TILE_SIZE, height: TILE_SIZE});
fruit.addComponent(Renderable);
fruit.addComponent(Fruit, {type: "apple"});

const screen = world.createEntity();
screen.addComponent(PositionOnGrid, {tile: 0, tileType: TileType.FREE, mapWidthInTiles: WIDTH_IN_TILES, mapHeightInTiles: HEIGHT_IN_TILES, tileSize: TILE_SIZE});
screen.addComponent(Body, {width: 640, height: 480});

// ------------------------------------
//
// Queries
//
// ------------------------------------
const allEntitiesThatAreMaps = world.createQuery({
    all: [GameMap]
})
const allEntitiesToRender = world.createQuery({
    all: [Renderable]
});

const allEntitiesWithKeyboard = world.createQuery({
    all: [Keyboard]
});

const allEntitiesOnGrid = world.createQuery({
    all: [Direction, PositionOnGrid]
});

// ------------------------------------
//
// Systems
//
// ------------------------------------
const renderSystem = world.addSystem(RenderSystem, {
    canvasName: 'canvas',
    appendTo: document.body,
    fps: 30
});
renderSystem.loadScreen(screen);

const keyboardSystem = world.addSystem(KeyboardControlSystem, {
    fps: 16
});
const gridSystem = world.addSystem(GridSystem, {
    fps: 120
});
gridSystem.loadMaps(allEntitiesThatAreMaps);
gridSystem.loadCurrentMap(currentMap);
gridSystem.loadEntities(allEntitiesOnGrid);


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