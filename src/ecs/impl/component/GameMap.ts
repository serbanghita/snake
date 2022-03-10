import Component from "../../Component";

export default class GameMap extends Component {
    public properties: {
        name: string;
        author: string;
    }

    constructor(props) {
        super(props);
    }
}