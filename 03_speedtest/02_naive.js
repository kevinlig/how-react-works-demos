const container = document.getElementById('app');

const update = (change = false) => {
    console.time('update');
    
    for (let i = 0; i < 10000; i++) {
        let value = `Item ${i}`;
        if (change && (i % 100 === 0)) {
            value = 'Changed item!';
        }

        const element = document.createElement('li');
        const content = document.createTextNode(value);
        element.appendChild(content);
        element.id = `item-${i}`;

        // check if a previous version of this element exists
        const oldElement = document.getElementById(`item-${i}`);
        if (!oldElement) {
            // no previous element exists, make it
            container.appendChild(element);
        }
        else if (oldElement && oldElement.innerText !== value) {
            // the old element value has changed, replace it
            container.replaceChild(element, oldElement);
        }
    }
    console.timeEnd('update');
}

update(false);

const updateButton = document.getElementById('update');
updateButton.onclick = () => { update(true); };

const regenerateButton = document.getElementById('regenerate');
regenerateButton.onclick = () => { update(false); };