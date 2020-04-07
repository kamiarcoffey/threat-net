import React, { Component } from 'react';
import SaveModal from './SaveModal';

class LoadButton extends Component {
    state = {
        show: false,
        graphId: 0,
    };

    setData = data => {
        this.props.setData(data);
    }
    
	handleIdOnChange = e => {
		this.setState({
			graphId: e.target.value
		});
	}
    
    loadGraph = () => {
        $.ajax({
            type : "GET",

            //hard coded id for now
            //TODO: generate unique graph id
            url : `/graph/loadGraph?id=${this.state.graphId}`, 
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
                    Add loaded graph list here<br></br>
                    <label>Graph ID</label>
					<input type="text" id="graphid" value={this.state.graphId} onChange={(e) => this.handleIdOnChange(e)}></input>
                    <button type="button" onClick={this.loadGraph}>
                    Load Graph
                    </button>
                </SaveModal>
            </main>
        )
    }
}

export default LoadButton;