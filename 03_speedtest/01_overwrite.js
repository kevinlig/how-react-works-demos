const container = document.getElementById('app');

const update = (change = false) => {
    console.time('update');
    let html = '';
    for (let i = 0; i < 10000; i++) {
        if (change && (i % 100 === 0)) {
            html += `<li>Changed item!</li>`;
        }
        else {
            html += `<li>Item ${i}</li>`;
        }
    }

    container.innerHTML = html;
    console.timeEnd('update');
}

update(false);

const updateButton = document.getElementById('update');
updateButton.onclick = () => { update(true); };

const regenerateButton = document.getElementById('regenerate');
regenerateButton.onclick = () => { update(false); };