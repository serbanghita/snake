import Component from "../../Component";

interface IGridProps {
    tileSize: number;
    widthInTiles: number;
    heightInTiles: number;
    widthInPx: number;
    heightInPx: number;
    blockedTilesValues: number[];
}

export default class Grid extends Component {
    public properties: IGridProps;

    constructor(props) {
        super(props);
    }
}