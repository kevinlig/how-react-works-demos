class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <h1>My Site</h1>
                <h2>Want to know what page you're on?</h2>
            </div>
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
        return (
            <div className="counter">
                <ul>
                    <li>First item.</li>
                    <li>{`Second item: You are on page ${this.state.count}.`}</li>
                    <li>Last item.</li>
                </ul>
                <button onClick={this.clickedButton}>Next Page</button>
            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Counter />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

