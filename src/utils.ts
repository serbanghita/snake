import Game, {Entity} from "./Game";

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRow(tileIndex: number): number {
    return Math.floor(tileIndex / Game.BOARD_SIZE);
}

export function getColumn(tileIndex: number): number {
    return tileIndex % Game.BOARD_SIZE;
}

export function isTileOutsideTheBoard(tileIndex: number) {
    if (tileIndex < 0 || tileIndex > ((Game.BOARD_SIZE * Game.BOARD_SIZE) - 1)) {
        return true;
    }
}

export function isTileOccupied(tileIndex, board: number[]) {
    return [Entity.SNAKE, Entity.BLOCKED].includes(board[tileIndex]);
}

export function createBoard(): number[] {
    return Game.BOARD_MATRIX.reduce((acc, value) => {
        return acc.concat(value);
    }, []);
}

export function convertBoardFromFlatToMatrix(flatArray: number[]): number[][] {
    return flatArray.reduce((acc: number[][], value, index) => {
        const row = getRow(index);

        if (!acc[row]) {
            acc[row] = [];
        }

        acc[row].push(value);

        return acc;
    }, []);
}

export function getFreeBoardTiles(flatArray: number[]) {
    return flatArray.reduce((acc, value, index) => {
        if (value > 0) {
            return acc;
        }
        (acc as number[]).push(index);
        return acc;
    }, []);
}