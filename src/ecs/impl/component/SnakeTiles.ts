import Component from "../../Component";
import Entity from "../../Entity";

export default class SnakeTiles extends Component {
    public properties: {
        tiles: Entity[]
    };

    constructor(props) {
        super(props);
    }
}