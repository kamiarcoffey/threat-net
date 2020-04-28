import React, { Component } from 'react';
import { toast } from 'react-toastify';

import SaveModal from './SaveModal';

class SaveButton extends Component {
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

	saveIdArray = (graphId) => {
		if (localStorage.hasOwnProperty('graphs')){
			var graphs = JSON.parse(localStorage.getItem("graphs"));
			if(!graphs.includes(graphId) && graphs.length < 10){
				graphs.push(graphId);
			}
			else if (!graphs.includes(graphId) && graphs.length >= 10){
				graphs.shift();
				graphs.push(graphId);
			}
			localStorage.setItem("graphs", JSON.stringify(graphs))
		}
	}

	saveGraph = () => {
		const cyData = this.state.cyData;
		console.log(cyData);
		var json_data = JSON.stringify(cyData);
		$.ajax({
			type: "POST",
			url: `/graph/saveGraph?name=${this.state.graphName}`,
			dataType: "json",
			data: { json_data },
			context: this,
			success: function (response) {
				toast.success(response.Message);
				this.saveIdArray(response.id);
				this.setState({
					show: false
				});
			},
			error: function (response) {
				toast.error(`Unable to save graph. Error: ${response}`)
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
				<button id="graph-save-button" type="button" onClick={this.showModal}>
					Save
                </button>
				<SaveModal onClose={this.hideModal} show={this.state.show}>
					<label>Graph Name</label>
					<input type="text" id="graphname" value={this.state.graphName} onChange={(e) => this.handleNameOnChange(e)}></input>
                    <button id="modal-save-button" type="button" onClick={this.saveGraph}>Save Graph</button>
				</SaveModal>
			</main>
		)
	}
}

export default SaveButton;