import React, { Component } from 'react';
import NodeModal from './NodeModal';

class NodeDetailsPane extends Component {
	state = {
		cyData: this.props.cyData,
		show: false,
		graphName: ""
	};

	static getDerivedStateFromProps(props, state) {
		if (props.cyData != state.cyData) {
			return {
				cyData: props.cyData,
				show: state.show,
				graphName: state.graphName
			};
		}
		return {
			cyData: state.cyData,
			show: state.show,
			graphName: state.graphName
		};
	}

	handleNameOnChange = e => {
		this.setState({
			graphName: e.target.value
		});
    }
    
    checkData = () => {
		const cyData = this.state.cyData;
		console.log(cyData);
		var json_data = JSON.stringify(cyData);
		console.log(json_data);
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
				<button id="node-details-button" type="button" onClick={this.showModal}>
					Details
                </button>
				<NodeModal onClose={this.hideModal} show={this.state.show}>
					<label>{this.state.cyData.filter(node => node.selected).map(node => JSON.stringify(node.data, null, '\t'))}</label>
				</NodeModal>
			</main>
		)
	}
}

export default NodeDetailsPane;