import Component from "../../Component";

export interface IGridProps {
    tileSize: number;
    widthInTiles: number;
    heightInTiles: number;
    widthInPx: number;
    heightInPx: number;
    blockedTilesValues: number[];
    gridAsArray: number[];
}

export default class Grid extends Component {
    public properties: IGridProps;

    constructor(props) {
        super(props);
    }
}