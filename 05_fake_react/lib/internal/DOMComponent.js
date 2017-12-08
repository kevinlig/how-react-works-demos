import { instantiateComponent } from '../utils.js';
import RenderQueue from './RenderQueue.js'

const events = ['onClick'];

export default class DOMComponent {
    constructor(element) {
        this.publicInstance = null;
        this.currentElement = element;
        this.childComponents = [];
    }

    receive(nextElement) {
        if (nextElement.type === this.currentElement.type) {
            // type is staying the same, update the children
            this.currentElement.props = nextElement.props;
            // we are supporting children for DOM elements, so loop through them and update them
            this.updateChildren(nextElement);
            return;
        }
        // the element type is changing, so drop the element and replace/regenerate it
        const newComponent = instantiateComponent(nextElement);
        // mount the new instance (the mount function will recurse through the children)
        const newNode = newComponent.mount();
        this.currentElement = nextElement;
        const operation = {
            type: 'REPLACE',
            oldNode: this.publicInstance,
            newNode: newNode
        };
        RenderQueue.add(operation);
    }

    updateChildren(nextElement) {
        nextElement.children.forEach((child, index) => {
            const currentChild = this.currentElement.children[index];
            if (typeof child === 'string') {
                // check if text has changed
                if (child !== currentChild) {
                    // text needs updating
                    this.publicInstance.innerText = child;
                }
                return;
            }

            // not inner text, child is a component
            // get the DOM or Composite child component using the index
            const childComponent = this.childComponents[index];
            // pass the changes to them
            childComponent.receive(child);
        });
    }

    mount() {
        // we are going to create the DOM instance here
        this.publicInstance = document.createElement(this.currentElement.type);
        // convert the props to DOM attributes
        Object.keys(this.currentElement.props).forEach((prop) => {
            const value = this.currentElement.props[prop];
            if (prop === 'className') {
                // special logic for CSS classes
                this.publicInstance.className = value;
            }
            else if (events.indexOf(prop) > -1) {
                // this is an event, not an attribute
                this.publicInstance[prop.toLowerCase()] = value;
            }
            else {
                this.publicInstance.setAttribute(prop, value);
            }
        });

        // now that we've created the parent node, iterate through the child elements
        this.currentElement.children.forEach((child) => {
            if (typeof child === 'string') {
                // child is the inner text
                this.publicInstance.innerText = child;
                return;
            }
            // child is another component, create the appropriate DOM or Composite component
            const childComponent = instantiateComponent(child);
            // mount the child (if it has children, we will recurse through them in their mounts)
            const childOutput = childComponent.mount();
            // append the child to the parent DOM element
            this.publicInstance.appendChild(childOutput);
            // keep track of the list of children so we can update them in the future
            this.childComponents.push(childComponent);
        });

        return this.publicInstance;
    }

    unmount() {
        this.childComponents.forEach((child) => {
            if (typeof child !== 'string') {
                child.unmount();
            }
            else {
                const operation = {
                    type: 'REMOVE',
                    node: this.publicInstance
                };
                RenderQueue.add(operation);
            }
        });
    }
}