import React, { Component } from 'react';

export default class SaveModal extends Component {
    render() {
        if(!this.props.show){
            return null;
        }
        return (
        <div id="node-modal">
            <button class="modal-close" onClick={this.props.onClose}>X</button>
            <h3 class="modal-title">Node Details</h3>
            <div>{this.props.children}</div>
        </div>
        );
    }
}