import { instantiateComponent } from './utils.js';

const mountTree = (element, container) => {
    const rootComponent = instantiateComponent(element);
    const rootDOM = rootComponent.mount();
    container.appendChild(rootDOM);
};

const domRenderer = {
    render: mountTree
};

export default domRenderer;