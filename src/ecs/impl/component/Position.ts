import Component from "../../Component";

export default class Position extends Component {
    public properties: {
        x: number
        y: number,
        xFuture: number,
        yFuture: number
    };

    constructor(props) {
        super(props);
    }
}