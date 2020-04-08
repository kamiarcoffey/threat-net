import React, { Component } from 'react';

export default class LoadModal extends Component {
    render() {
        if(!this.props.show){
            return null;
        }
        return (
        <div id="load-modal">
            <button class="modal-close" onClick={this.props.onClose}>X</button>
            <h3 class="modal-title">Load Graph</h3>
            <div>{this.props.children}</div>
        </div>
        );
    }
}