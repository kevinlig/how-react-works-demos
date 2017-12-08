import CompositeComponent from './internal/CompositeComponent.js';
import DOMComponent from './internal/DOMComponent.js';

export const createElement = (type, props, ...children) => {
    return {
        type,
        props,
        children
    };
};

export const instantiateComponent = (element) => {
    if (typeof element.type === 'string') {
        return new DOMComponent(element);
    }

    return new CompositeComponent(element);
};