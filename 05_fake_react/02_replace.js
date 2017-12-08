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
                'My More Complex Site'
            ),
            FakeReact.createElement(
                'h2',
                {},
                'Pick an element type'
            ),
            FakeReact.createElement(
                'div',
                {
                    className: 'menu'
                },
                FakeReact.createElement(
                    'button',
                    {
                        onClick: this.props.showType,
                        value: 'image'
                    },
                    'Image'
                ),
                FakeReact.createElement(
                    'button',
                    {
                        onClick: this.props.showType,
                        value: 'table'
                    },
                    'Table'
                )
            )
        );
    }
}

class Image extends FakeReact.Component {
    componentWillUnmount() {
        console.log('Image about to unmount!');
    }

    render() {
        return FakeReact.createElement(
            'img',
            {
                src: 'logo.png',
                alt: 'React logo'
            }
        );
    }
}

class Table extends FakeReact.Component {
    render() {
        const rows = [];
        for (let i = 0; i < 3; i++) {

            const cells = [];
            for (let j = 0; j < 5; j++) {
                cells.push(
                    FakeReact.createElement(
                        'td',
                        {},
                        `Cell ${j}`
                    )
                );
            }

            rows.push(
                FakeReact.createElement(
                    'tr',
                    {},
                    ...cells
                )
            );
        }

        return FakeReact.createElement(
            'table',
            {},
            ...rows
        );
    }
}

class Content extends FakeReact.Component {
    render() {
        let content = FakeReact.createElement(
            Image,
            {}
        );

        if (this.props.display === 'table') {
            content = FakeReact.createElement(
                Table,
                {}
            );
        }

        return FakeReact.createElement(
            'div',
            {
                className: 'content'
            },
            content
        );
    }
}

class App extends FakeReact.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: 'image'
        };

        this.showType = this.showType.bind(this);
    }
 
    showType(e) {
        this.setState({
            display: e.target.value
        });
    }

    render() {
        return FakeReact.createElement(
            'div',
            {},
            FakeReact.createElement(
                Header,
                {
                    showType: this.showType
                }
            ),
            FakeReact.createElement(
                Content,
                {
                    display: this.state.display
                }
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
