import FakeReact from './lib/FakeReact.js';
import DOMRenderer from './lib/DOMRenderer.js';

class Header extends FakeReact.Component {
    render() {
        return FakeReact.createElement(
            'div',
            {
                className: 'header'
            },
            FakeReact.createElement(
                'h1',
                {},
                'My Site'
            ),
            FakeReact.createElement(
                'h2',
                {},
                'Want to know what page you\'re on?'
            )
        );
    }
}

class Counter extends FakeReact.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 1
        };

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.setState({
            count: this.state.count + 1
        });
    }

    render() {
        return FakeReact.createElement(
            'div',
            {
                className: 'counter'
            },
            FakeReact.createElement(
                'ul',
                {},
                FakeReact.createElement(
                    'li',
                    {},
                    'First item.'
                ),
                FakeReact.createElement(
                    'li',
                    {},
                    `Second item: You are on page ${this.state.count}.`
                ),
                FakeReact.createElement(
                    'li',
                    {},
                    'Last item.'
                )
            ),
            FakeReact.createElement(
                'button',
                {
                    onClick: this.clickedButton
                },
                'Next Page'
            )
        );
    }
}

class App extends FakeReact.Component {
    componentWillMount() {
        console.log('component will mount');
    }

    render() {
        return FakeReact.createElement(
            'div',
            {},
            FakeReact.createElement(
                Header,
                {}
            ),
            FakeReact.createElement(
                Counter,
                {}
            )
        );
    }
}

DOMRenderer.render(
    FakeReact.createElement(
        App
    ),
    document.getElementById('app')
);
