export function getTileColumn(tile: number, widthInTiles: number): number {
    return (tile % widthInTiles);
}

export function getTileRow(tile: number, widthInTiles: number): number {
    return Math.floor(tile / widthInTiles);
}

export function getTileFromRowAndColumn(column: number, row: number, widthInTiles: number): number {
    return (row + 1) * widthInTiles - (widthInTiles - column);
}

export function getTileFromXY(x: number, y: number, tileWidthInPx: number, tileHeightInPx: number): number {
    const tileIndex = Math.floor(x / tileWidthInPx) +
        this.tiledMap.widthInTiles * Math.floor(y / tileHeightInPx);

    if (tileIndex < 0 || tileIndex > (tileWidthInPx * tileHeightInPx)) {
        throw new Error(`Invalid tile ${tileIndex} resulted from ${x} and ${y}`);
    }

    return tileIndex;
}