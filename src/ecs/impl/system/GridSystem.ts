import System from "../../System";
import Entity from "../../Entity";
import Grid from "../component/Grid";
import Tiled from "../component/Tiled";
import PositionOnGrid from "../component/PositionOnGrid";
import IsSnake from "../component/IsSnake";
import SnakeTiles from "../component/SnakeTiles";
import Direction, {DIRECTION} from "../component/Direction";

export default class GridSystem extends System {

    private maps: Entity[] = [];

    // Current loaded map.
    private loadedMap: Entity;
    private loadedMapGrid: Grid;

    constructor(protected world, public properties) {
        super(world, properties);
    }

    public loadEntities(entities: Entity[]) {
        entities.forEach((entity) => {
            const positionOnGrid = entity.getComponent(PositionOnGrid);
            this.loadedMapGrid.properties.gridAsArray[positionOnGrid.properties.tile] = positionOnGrid.properties.tileType;
        });
    }

    public loadMaps(entities: Entity[]) {
        // Load all maps.
        this.maps = entities;
    }

    public loadCurrentMap(entity: Entity) {
        // Pick the default map.
        this.loadedMap = entity;
        this.loadedMapGrid = entity.getComponent(Grid);
        if (entity.hasComponent(Tiled)) {
            // @todo: Enhance mapGrid with collision tiles from Tiled map.
        }
    }

    public getTileColumn(tile: number): number {
        return (tile % this.loadedMapGrid.properties.widthInTiles);
    }

    public getTileRow(tile: number): number {
        return Math.floor(tile / this.loadedMapGrid.properties.widthInTiles);
    }

    public getTileFromRowAndColumn(column: number, row: number): number {
        const widthInTiles = this.loadedMapGrid.properties.widthInTiles;
        return (row + 1) * widthInTiles - (widthInTiles - column);
    }

    public isTileBlocked(tile: number): boolean {
        const tileValue = this.loadedMapGrid.properties.gridAsArray[tile];
        return this.loadedMapGrid.properties.blockedTilesValues.includes(tileValue);
    }

    public getTileFromXY(x: number, y: number): number {
        const tileIndex = Math.floor(x / this.loadedMapGrid.properties.tileSize) +
            this.loadedMapGrid.properties.widthInTiles * Math.floor(y / this.loadedMapGrid.properties.tileSize);

        if (tileIndex < 0 || tileIndex > this.loadedMapGrid.properties.widthInTiles * this.loadedMapGrid.properties.heightInTiles) {
            throw new Error(`Invalid tile ${tileIndex} resulted from ${x} and ${y}`);
        }

        return tileIndex;
    }

    public getXYFromTileIndex(tileIndex: number): {x: number, y: number} {
        const rows = Math.floor(tileIndex / this.loadedMapGrid.properties.widthInTiles);

        return {
            x: (this.loadedMapGrid.properties.tileSize * (tileIndex % this.loadedMapGrid.properties.widthInTiles)),
            y: (rows * this.loadedMapGrid.properties.tileSize)
        };
    }

    public isSnakeGrowthTile(tile: number): boolean {
        const tileValue = this.loadedMapGrid.properties.gridAsArray[tile];
        return this.loadedMapGrid.properties.snakeGrowsTilesValues.includes(tileValue);
    }

    private computeFutureTileByDirection(currentTile: number, direction: DIRECTION) {
        let futureTile;

        switch (direction) {
            case DIRECTION.UP:
                futureTile = currentTile - this.loadedMapGrid.properties.widthInTiles;
                break;
            case DIRECTION.DOWN:
                futureTile = currentTile + this.loadedMapGrid.properties.widthInTiles;
                break;
            case DIRECTION.LEFT:
                futureTile = currentTile - 1;
                break;
            case DIRECTION.RIGHT:
                futureTile = currentTile + 1;
                break;
        }

        return futureTile;
    }

    update(now: number, entities: Entity[]) {
        if (this.fps > 0) {
            const check = this.isFrequencySatisfied(now);
            if (!check) {
                return false;
            }
        }

        entities.forEach((entity) => {
            this.updateEntity(entity);
        });
    }

    private updateEntity(entity: Entity) {

        const direction = entity.getComponent(Direction);
        if (direction.properties.direction === DIRECTION.NONE) {
            return false;
        }

        // Snake Entity movement.
        if (entity.hasComponent(IsSnake)) {
            // Snake entity just needs to move and the tail will follow.
            const snakeTiles = entity.getComponent(SnakeTiles);
            const snakeCurrentHead = snakeTiles.properties.tiles[0] as Entity;
            const snakeCurrentHeadPos = snakeCurrentHead.getComponent(PositionOnGrid);
            const snakeCurrentHeadTile = snakeCurrentHeadPos.properties.tile;

            const futureTile = this.computeFutureTileByDirection(snakeCurrentHeadTile, direction.properties.direction);

            // Tail becomes the head.
            const snakeNewHead = snakeTiles.properties.tiles.pop() as Entity;
            snakeTiles.properties.tiles.unshift(snakeNewHead);
            const snakeNewHeadPos = snakeNewHead.getComponent(PositionOnGrid);
            snakeNewHeadPos.properties.tile = futureTile;

            return true;
        }

        // Single tiled entity movement.

        const position = entity.getComponent(PositionOnGrid);

        if (
            (typeof position.properties.tileInTheFuture === "undefined") ||
            (position.properties.tile === position.properties.tileInTheFuture)
        ) {
            return false;
        }

        // if (this.isTileBlocked(position.properties.tileInTheFuture)) {
        //     throw new Error(`Collision happened.`);
        // } else if (this.isSnakeGrowthTile(position.properties.tileInTheFuture)) {
        //     // 1. Create a new Snake Tile entity in the place of the "fruit".
        //
        //     // 2. Add the new Snake Tile entity to the Snake entity.
        // }


        const tileInThePast = position.properties.tile;
        const tileInTheFuture = position.properties.tileInTheFuture;

        this.updateEntityPositionTile(position, tileInThePast, tileInTheFuture);
    }

    private updateEntityPositionTile(position: PositionOnGrid, tileInThePast: number, tileInTheFuture: number) {
        position.properties.tile = position.properties.tileInTheFuture;

        this.loadedMapGrid.properties.gridAsArray[tileInThePast] = 0;
        this.loadedMapGrid.properties.gridAsArray[tileInTheFuture] = 1;
    }

}