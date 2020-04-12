import React, { Component } from 'react';
import { toast } from 'react-toastify';

class NewButton extends Component {

    clearGraph = () => {
        toast.success('New graph successfully created');
        this.props.setData([]);
    }

    render() {
        return (
            <button id="graph-new-button" type="button" onClick={this.clearGraph}>New</button>
        );
    }
}

export default NewButton;