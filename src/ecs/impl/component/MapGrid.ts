import Component from "../../Component";

interface IMapGridProps {
    tileSize: number;
    widthInTiles: number;
    heightInTiles: number;
}

export default class MapGrid extends Component {
    public properties: IMapGridProps;

    constructor(props) {
        super(props);
    }
}