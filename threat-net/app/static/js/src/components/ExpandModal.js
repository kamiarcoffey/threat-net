import React, { Component } from 'react';
import '../styles/components/_modal.scss';

const ModalStyles = {
    'display': 'inline',
    'right' : '1rem',
    'top' : '6rem'
}



export default class ExpandModal extends Component {
    render() {
        if(!this.props.show){
            return null;
        }
        return (
        <div id="expand-modal" style = {ModalStyles}>
            <button className="modal-close" onClick={this.props.onClose}>X</button>
            <h3 className="modal-title">Expand Node</h3>
            <div>{this.props.children}</div>
        </div>
        );
    }
}