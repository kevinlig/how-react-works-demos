const container = document.getElementById('app');

const components = {};

const BaseComponent = {
    _createElement() {
        // create a new DOM element from scratch
        this._el = document.createElement(this.type);
        this._content = document.createTextNode(this.value);
        this._el.appendChild(this._content);
        container.appendChild(this._el);
    },
    _updateElement(newValue) {
        // update the existing element in place
        if (!this._el) {
            // element has not been created yet, so we can't update
            this._createNewInstance();
            return;
        }
        const newContent = document.createTextNode(newValue);
        this._el.replaceChild(newContent, this._content);
        this._content = newContent;
        this.value = newValue;
    },
    create() {
        // we need to return an explicitly-bound version of the function that maps the context to
        // the object instance for when it gets called in an anonymous form by the operation queue
        return this._createElement.bind(this);
    },
    update(nextValue) {
        // we need to return an explicitly-bound version of the function that maps the context to
        // the object instance for when it gets called in an anonymous form by the operation queue
        return this._updateElement.bind(this, nextValue);
    },
    populate(props = {
        type: '',
        value: ''
    }) {
        const { type, value } = props;
        this.type = type;
        this.value = value;
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
            if (item.value !== value) {
                // the item's value has changed
                // for this example, we won't handle element type changes, so everything will only
                // update in place after its initial creation
                writeOps.push(item.update(value));
            }
        }
        else {
            // new component, create it
            const item = Object.create(BaseComponent);
            item.populate({
                type: 'li',
                value: value
            });
            writeOps.push(item.create());
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