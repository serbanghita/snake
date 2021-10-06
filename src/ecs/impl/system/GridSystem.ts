import System from "../../System";
import Entity from "../../Entity";
import Grid from "../component/Grid";
import Tiled from "../component/Tiled";
import Position from "../component/Position";
import PositionOnGrid from "../component/PositionOnGrid";
import {getTileFromXY} from "../../utils";

export default class GridSystem extends System {

    private map: Entity;
    private mapGrid: Grid;

    constructor(props) {
        super(props);
    }

    public initEntities(entities: Entity[]) {
        entities.forEach((entity) => {
            const positionOnGrid = entity.getComponent(PositionOnGrid);
            this.mapGrid.properties.gridAsArray[positionOnGrid.properties.tile] = positionOnGrid.properties.tileType;
        });
    }

    public addMap(map: Entity) {
        this.map = map;
        this.mapGrid = map.getComponent(Grid);
        if (map.hasComponent(Tiled)) {
            // Enhance mapGrid with collision tiles from Tiled map.
        }
    }

    public getTileColumn(tile: number): number {
        return (tile % this.mapGrid.properties.widthInTiles);
    }

    public getTileRow(tile: number): number {
        return Math.floor(tile / this.mapGrid.properties.widthInTiles);
    }

    public getTileFromRowAndColumn(column: number, row: number): number {
        const widthInTiles = this.mapGrid.properties.widthInTiles;
        return (row + 1) * widthInTiles - (widthInTiles - column);
    }

    public isTileBlocked(tile: number): boolean {
        const tileValue = this.mapGrid.properties.gridAsArray[tile];
        return this.mapGrid.properties.blockedTilesValues.includes(tileValue);
    }

    public getTileFromXY(x: number, y: number): number {
        return getTileFromXY(x, y, this.mapGrid.properties);
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
        const position = entity.getComponent(Position);
        const positionOnGrid = entity.getComponent(PositionOnGrid);

        if (
            (typeof position.properties.xFuture === "undefined" && typeof position.properties.yFuture === "undefined") ||
            (position.properties.x === position.properties.xFuture && position.properties.y === position.properties.yFuture)
        ) {
            return false;
        }

        const tileInTheFuture = this.getTileFromXY(position.properties.xFuture, position.properties.yFuture);
        if (this.isTileBlocked(tileInTheFuture)) {
            throw new Error(`Collision happened.`);
        }

        position.properties.x = position.properties.xFuture;
        position.properties.y = position.properties.yFuture;
        const tileInThePast = positionOnGrid.properties.tile;
        positionOnGrid.properties.tile = tileInTheFuture;

        this.mapGrid.properties.gridAsArray[tileInThePast] = 0;
        this.mapGrid.properties.gridAsArray[tileInTheFuture] = 1;
    }

}