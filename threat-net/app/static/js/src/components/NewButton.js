import React, { Component } from 'react';

class NewButton extends Component {

    clearGraph = () => {
        this.props.setData([]);
    }

    render() {
        return (
            <button id="graph-new-button" type="button" onClick={this.clearGraph}>New</button>
        );
    }
}

export default NewButton;