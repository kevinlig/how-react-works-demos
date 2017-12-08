class RenderQueue {
    constructor() {
        this._queue = [];
    }

    add(operation) {
        this._queue.push(operation);
    }

    render() {
        // perform all the operations we've queued up
        this._queue.forEach((operation) => {
            switch(operation.type) {
                case 'REPLACE':
                    operation.oldNode.parentNode.replaceChild(operation.newNode, operation.oldNode);
                    break;
                case 'REMOVE':
                    operation.node.parentNode.removeChild(operation.node);
                    break;
            }
        });

        // reset the queue
        this._queue = [];
    }
}

const instance = new RenderQueue();
export default instance;
