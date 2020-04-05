import React, { Component } from 'react';
import SaveModal from './SaveModal';

class LoadButton extends Component {
    state = { show: false };

    setData = data => {
        this.props.setData(data);
    }
    
    loadGraph = () => {
        $.ajax({
            type : "GET",
            url : '/graph/loadGraph',
            context: this,
            success: function (data) {
                this.setData(data);
                this.hideModal();
                }
            }
        );
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <main>
                <button type="button" onClick={this.showModal}>
                    Load
                </button>
                <SaveModal onClose={this.hideModal} show={this.state.show}>
                    Load Graph List
                    <button type="button" onClick={this.loadGraph}>
                    Load Graph
                    </button>
                </SaveModal>
            </main>
        )
    }
}

export default LoadButton;