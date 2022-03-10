import Component from "../../Component";

export enum DIRECTION {
    NONE = 0,
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4
}

export default class Direction extends Component {
    public properties: {
        direction: DIRECTION;
    };

    constructor(props) {
        super(props);
    }
}