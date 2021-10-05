import System from "../../System";
import Entity from "../../Entity";
import Grid from "../component/Grid";
import Tiled from "../component/Tiled";
import Position from "../component/Position";
import PositionOnGrid from "../component/PositionOnGrid";

export default class GridSystem extends System {

    private map: Entity;
    private mapGrid: Grid;

    constructor(props) {
        super(props);
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

    public getTileFromXY(x: number, y: number): number {
        const tileWidthInPx = this.mapGrid.properties.widthInPx;
        const tileHeightInPx = this.mapGrid.properties.heightInPx;
        const widthInTiles = this.mapGrid.properties.widthInTiles;

        const tileIndex = Math.floor(x / tileWidthInPx) + widthInTiles * Math.floor(y / tileHeightInPx);

        if (tileIndex < 0 || tileIndex > (tileWidthInPx * tileHeightInPx)) {
            throw new Error(`Invalid tile ${tileIndex} resulted from ${x} and ${y}`);
        }

        return tileIndex;
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

        if ()
    }

}