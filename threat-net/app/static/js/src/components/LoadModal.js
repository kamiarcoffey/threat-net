import React, { Component } from 'react';
import '../styles/components/_modal.scss';

const ModalStyles = {
    'display': 'inline',
    'right' : '1rem',
    'top' : '6rem'
}



export default class LoadModal extends Component {
    render() {
        if(!this.props.show){
            return null;
        }
        return (
        <div id="load-modal" style = {ModalStyles}>
            <button className="modal-close" onClick={this.props.onClose}>X</button>
            <h3 className="modal-title">Load Graph</h3>
            <div>{this.props.children}</div>
        </div>
        );
    }
}

// className = "modalStyler"