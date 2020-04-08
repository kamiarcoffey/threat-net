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

	showModal = () => {
		this.setState({ show: true });
	};

	hideModal = () => {
		this.setState({ show: false });
	};

    render() {
		return (
			<main>
				<button id="graph-new-button" type="button" onClick={this.showModal}>
					Details
                </button>
				<NodeModal onClose={this.hideModal} show={this.state.show}>
					<label>Graph Name</label>
				</NodeModal>
			</main>
		)
	}
}

export default NodeDetailsPane;