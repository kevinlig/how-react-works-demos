class Header extends React.Component {
    render() {
        return React.createElement(
            'div',
            {
                className: 'header'
            },
            React.createElement(
                'h1',
                null,
                'My Site'
            ),
            React.createElement(
                'h2',
                null,
                'Want to know what page you\'re on?'
            )
        );
    }
}

class Counter extends React.Component {
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
        return React.createElement(
            'div',
            {
                className: 'counter'
            },
            React.createElement(
                'ul',
                null,
                React.createElement(
                    'li',
                    null,
                    'First item.'
                ),
                React.createElement(
                    'li',
                    null,
                    `Second item: You are on page ${this.state.count}.`
                ),
                React.createElement(
                    'li',
                    null,
                    'Last item.'
                )
            ),
            React.createElement(
                'button',
                {
                    onClick: this.clickedButton
                },
                'Next Page'
            )
        );
    }
}

class App extends React.Component {
    render() {
        return (
            React.createElement(
                'div',
                null,
                React.createElement(
                    Header,
                    null,
                    null
                ),
                React.createElement(
                    Counter,
                    null,
                    null
                )
            )
        );
    }
}

ReactDOM.render(
    React.createElement(
        App,
        null,
        null
    ),
    document.getElementById('app')
);
