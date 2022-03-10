import Component from "../../Component";

export default class PositionOnGrid extends Component {
    public properties: {
        tile: number;
        tileInTheFuture: number;
        tileType: number;
    };

    constructor(props) {
        super(props);
    }

}