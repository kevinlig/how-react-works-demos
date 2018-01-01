import { instantiateComponent } from '../utils.js';

export default class BaseComponent {
    constructor(props) {
        this._internalInstance = null;
        this._child = null;
        this.props = props;

        this.state = {};
    }

    setState(changedState) {
        this.state = Object.assign({}, this.state, changedState);
        this._internalInstance.update();
    }
}
