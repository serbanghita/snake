import {IGridProps} from "./impl/component/Grid";

export function getTileFromXY(x: number, y: number, gridProps: IGridProps): number {
    const tileIndex = Math.floor(x / gridProps.tileSize) +
        gridProps.widthInTiles * Math.floor(y / gridProps.tileSize);

    if (tileIndex < 0 || tileIndex > gridProps.widthInTiles * gridProps.heightInTiles) {
        throw new Error(`Invalid tile ${tileIndex} resulted from ${x} and ${y}`);
    }

    return tileIndex;
}