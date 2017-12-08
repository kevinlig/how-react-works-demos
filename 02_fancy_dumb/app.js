import FancyFramework from './framework/FancyFramework.js';

const el = document.getElementById('app');
const app = new FancyFramework(el);

const clickEvent = () => {
    app.setState({
        page: app.state.page + 1
    });
    app.render();
    bindClick();
};

const bindClick = () => {
    const button = document.getElementById('next');
    button.onclick = clickEvent;
};


// load the template async
fetch('templates/site_template.html')
    .then((res) => {
        return res.text();
    })
    .then((template) => {
        app.setTemplate(template);
        app.setState({
            title: 'My Site',
            page: 1
        });

        app.render();
        bindClick();
    });

