export default class FancyFramework {
    constructor(target) {
        this._target = target;
        this._template = '';

        this.state = {};
    }

    setTemplate(html) {
        this._template = html;
    }

    setState(newState) {
        this.state = Object.assign({}, this.state, newState);
    }

    render() {
        // implement a custom templating engine
        const templateRegex = /<% \S+ %>/g;
        const htmlOutput = this._template.replace(templateRegex, (match, offset, string) => {
            // get the match and drop the <% %> tags to extract the variable name
            const variableName = match.slice(3, match.length - 3);

            // replace the variable template with the state value if it exists
            if (this.state[variableName]) {
                return this.state[variableName];
            }
            // otherwise use an empty string
            return '';
        });

        this._target.innerHTML = htmlOutput;
    }
}