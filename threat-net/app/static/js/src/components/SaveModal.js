import React, { Component } from 'react';

export default class SaveModal extends Component {
    render() {
        if(!this.props.show){
            return null;
        }
        return (
        <div id="modal">
            <h2>Modal Window</h2>
            <div>{this.props.children}</div>
            <div>
                <button onClick={this.props.onClose}>
                Close
                </button>
            </div>
        </div>
        );
    }
}