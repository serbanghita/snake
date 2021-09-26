import Component from "../../Component";

interface IKeyboard {
    UP: string;
    DOWN: string;
    LEFT: string;
    RIGHT: string;
}

export default class Keyboard extends Component {
    public properties: IKeyboard;

    constructor(props) {
        super(props);
    }


}