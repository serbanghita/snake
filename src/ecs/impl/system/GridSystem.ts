import System from "../../System";
import Entity from "../../Entity";
import MapGrid from "../component/MapGrid";

interface GridState {
    grid: number[];
}

export default class GridSystem extends System {

    private mapGrid: MapGrid;

    constructor(props) {
        super(props);
    }

    public addMapGrid(mapGrid: MapGrid) {
        this.mapGrid = mapGrid;
    }

    private createEmptyGrid() {
        return new Array(this.properties.widthInTiles * this.properties.heightInTiles).fill(0);
    }


    update(now: number, entities: Entity[]) {
        if (this.fps > 0) {
            const check = this.isFrequencySatisfied(now);
            if (!check) {
                return false;
            }
        }

        entities.forEach((entity) => {
            this.manageEntity(entity);
        });
    }

    private manageEntity(entity) {

    }

}