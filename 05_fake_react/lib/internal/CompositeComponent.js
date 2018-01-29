import { instantiateComponent } from '../utils.js';
import RenderQueue from './RenderQueue.js'

export default class CompositeComponent {
    constructor(element) {
        this.publicInstance = null;
        this.currentElement = element;
        this.childElement = null;
        this.childComponent = null;
        this.hostElement = null;
    }

    receive(nextElement) {
        // the component is about to change, check to see if the type has changed
        if (nextElement.type === this.currentElement.type) {
            // element is staying the same
            this.currentElement = nextElement;
            // update its props
            this.publicInstance.props = nextElement.props;
            // continue down to the child component for diffing
            this.childComponent.receive(this.publicInstance.render());
        }
        else {
            // unmount the old element
            this.unmount();
            // mount the new element type
            this.currentElement = nextElement;
            // grab a reference to the old host element before it is overwritten by the next mount
            const oldHost = this.hostElement;
            const newHost = this.mount();

            // create a DOM operation to replace the host element
            const operation = {
                type: 'REPLACE',
                oldNode: oldHost,
                newNode: newHost
            };
            RenderQueue.add(operation);
        }
    }

    update() {
        // this is called when the state changes.
        // Only composite components can have state (since otherwise they would be non-React DOM
        // components).
        // And since we know this is the component whose state has changed, we can start our
        // diffing at this level rather than going back up to the top of the stack.
        // By calling the React component's render function again, it will output a JS object
        // representation of the child composite or DOM component - but with the updated state
        // values. We can then pass this to the child component for diffing (since a state
        // change won't change this current component's type).
        this.childComponent.receive(this.publicInstance.render());

        // the receive functions at each child level will further recurse to the end, so once
        // those are all done, the render queue will be populated and we can run all the operations
        RenderQueue.render();
    }


    mount() {
        const element = this.currentElement;
        // instantiate an instance of the component class
        this.publicInstance = new element.type(element.props);
        // create a reference back to this component for future updating
        this.publicInstance._internalInstance = this;

        if (this.publicInstance.componentWillMount) {
            // component is about to mount, call the lifecycle function
            this.publicInstance.componentWillMount();
        }

        // call the render function to return a plain JS object representing the child
        this.childElement = this.publicInstance.render();

        // create the DOM or Composite component for the child
        this.childComponent = instantiateComponent(this.childElement);

        // mount the child DOM/Composite component
        const host = this.childComponent.mount();
        // retain a reference to this element so we can swap it out layer
        this.hostElement = host;
        return host;
    }

    unmount() {
        if (this.publicInstance.componentWillUnmount) {
            // component is about to unmount, call the lifecycle function
            this.publicInstance.componentWillUnmount();
        }

        // release the component instance's reference to it child internal component
        this.publicInstance._internalInstance = null;

        // recurse through the children and unmount them
        this.childComponent.unmount();

        RenderQueue.render();

        // release any references to child components
        this.publicInstance = null;
        this.currentElement = null;
        this.childElement = null;
        this.childComponent = null;
    }
}
