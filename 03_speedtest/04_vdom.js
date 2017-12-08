const container = document.getElementById('app');

const components = {};

// create a component factory function
const Component = (props = {
        type: '',
        value: ''
    }) => {
    let type = props.type;
    let value = props.value;
    let ref = null;
    let contentRef = null;

    const _buildElement = () => {
        ref = document.createElement(type);
        contentRef = document.createTextNode(value);
        ref.appendChild(contentRef);
        container.appendChild(ref);
    };

    const _updateElement = () => {
        const newContent = document.createTextNode(value);
        ref.replaceChild(newContent, contentRef);
        contentRef = newContent;
    };

    const _operation = () => {
        if (ref) {
            // element exists, update it
            _updateElement();
        }
        else {
            // element doesn't exist, create it
            _buildElement();
        }
    };

    return {
        create: () => {
            _buildElement();
        },
        update: (newValue) => {
            if (newValue === value) {
                // nothing has changed
                return null;
            }
            value = newValue;
            return _operation;
        }
    }
};

const update = (change = false) => {
    console.time('update');
    
    const writeOps = [];

    for (let i = 0; i < 10000; i++) {
        let value = `Item ${i}`;
        if (change && (i % 100 === 0)) {
            value = 'Changed item!';
        }

        const key = `item-${i}`;
        if (components[key]) {
            // existing component, update it
            const item = components[key];
            const update = item.update(value);
            if (update) {
                writeOps.push(update);
            }
        }
        else {
            // new component, create it
            const item = Component({
                type: 'li',
                value: value
            });
            writeOps.push(item.create);
            components[key] = item;
        }
    }

  
    writeOps.forEach((operation) => {
        operation();
    });
    console.timeEnd('update');
}

update(false);

const updateButton = document.getElementById('update');
updateButton.onclick = () => { update(true); };

const regenerateButton = document.getElementById('regenerate');
regenerateButton.onclick = () => { update(false); };