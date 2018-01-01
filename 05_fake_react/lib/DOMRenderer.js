import { instantiateComponent } from './utils.js';

const _mountTree = (element, container) => {
    const rootComponent = instantiateComponent(element);
    const rootDOM = rootComponent.mount();
    container.appendChild(rootDOM);
};

const domRenderer = {
    render: _mountTree
};

export default domRenderer;
