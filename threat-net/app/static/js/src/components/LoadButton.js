import React, { Component } from 'react';
import { toast } from 'react-toastify';

import LoadModal from "./LoadModal";

const styles = {
    'listStyleType': 'none',
    'display': 'inline',
    'justifyContent': 'left',
    
}

const listItemStyles = {
    'cursor': 'pointer'
}

const hrStyle = {
    "height": "1px",
    "color": "#c41902",
    "backgroundColor": "#c41902",
    "border": "none"
}

const spanStyle = {
    'fontWeight': 'bold'
}

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
            url : `/graph/loadGraph?id=${this.state.graphId}`, 
            context: this,
            success: function (data) {
                this.setData(data);
                this.hideModal();
                toast.success(`Graph with ID ${this.state.graphId} successfully loaded.`);
                },
            error: function(response) {
                toast.error(`Unable to load graph. Error: ${response}`)
                },
            },
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
                <button id="graph-load-button" type="button" onClick={this.showModal}>
                    Load
                </button>
                <LoadModal onClose={this.hideModal} show={this.state.show} >
                    Add loaded graph list here<br></br>
                    <label>Graph ID</label>
					<input type="text" id="graphid" value={this.state.graphId} onChange={(e) => this.handleIdOnChange(e)}></input>
                    <button id="modal-load-button" type="button" onClick={this.loadGraph}>Load Graph</button>
                    <hr style = {hrStyle}></hr>
                    <h4><span style={spanStyle}>Or Choose A Recent Graph
                    </span>
                    </h4>
                    <ul style = {styles}>
                        <li><a onClick = {this.loadGraph} style = {listItemStyles}>exectuable-files-graph-0413</a></li>
                        <li><a onClick = {this.loadGraph} style = {listItemStyles}>experimengraph-2019</a></li>
                        <li><a onClick = {this.loadGraph} style = {listItemStyles}>ioc-graph-for2020</a></li>
                    </ul>
                </LoadModal>
            </main>
        )
    }
}

export default LoadButton;