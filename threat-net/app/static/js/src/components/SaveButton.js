import React, { Component } from 'react';
import SaveModal from './SaveModal';

class SaveButton extends Component {
    state = {
        cyData: this.props.cyData,
        show: false 
    
    };

    static getDerivedStateFromProps(props, state) {
        if (props.cyData != state.cyData) {
          return {
            cyData: props.cyData,
            show: state.show
          };
        }
        return {
            cyData: state.cyData,
            show: state.show
          };
    }

    saveGraph = () => {
        const cyData = this.state.cyData;
        console.log(cyData);
        $.ajax({
            type : "POST",
            url : '/graph/saveGraph',
            dataType: "json",
            data: {cyData},
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                console.log(data);
                }
            });
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
                    Save
                </button>
                <SaveModal onClose={this.hideModal} show={this.state.show}>
                    Save Graph Options Go Here
                    <button type="button" onClick={this.saveGraph}>
                    Save Graph
                    </button>
                </SaveModal>
            </main>
        )
    }
}

export default SaveButton;