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
        graphList: []
    };

    setData = data => {
        this.props.setData(data);
    }
    
	handleIdOnChange = e => {
		this.setState({
			graphId: e.target.value
		});
    }
    
    updateGraphID = (id) => {
        this.setState({graphId: id});
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

    loadGraphList = () => {
        $.ajax({
            type : "GET",
            url: '/graph/graphList',
            context: this,
            success: function(data){
                if(this.state.graphList.length == 0){
                    this.setState({graphList: JSON.parse(data)})
                }
            }, 
            error: function(response){
                toast.error('Unable to load graph list, Error: ${response}');
            }
        });
    }    

    render() {
        this.loadGraphList()
        const graphList = this.state.graphList;
        const entries = Object.entries(graphList);

        //create list of <li> elements, one for each graph
        var htmlList = []; 
        for (const [id, name] of entries) {
            htmlList.push(<li key = {id}><a onClick = {() => {this.setState({graphId: id}, () => this.loadGraph())}} style = {listItemStyles}>{name}</a></li>);
        }
        
        return (
            <main>
                <button id="graph-load-button" type="button" onClick={this.showModal}>
                    Load
                </button>
                <LoadModal onClose={this.hideModal} show={this.state.show} >
                    <label>Enter Graph ID</label>
					<input type="text" id="graphid" value={this.state.graphId} onChange={(e) => this.handleIdOnChange(e)}></input>
                    <button id="modal-load-button" type="button" onClick={this.loadGraph}>Load Graph</button>
                    <hr style = {hrStyle}></hr>
                    <h4><span style={spanStyle}>Or Choose A Recent Graph
                    </span>
                    </h4>
                    <ul style = {styles}>
                        {htmlList}
                    </ul>
                </LoadModal>
            </main>
        )
    }
}

export default LoadButton;

// <li><a onClick = {this.loadGraph} style = {listItemStyles}>experimengraph-2019</a></li>
//                         <li><a onClick = {this.loadGraph} style = {listItemStyles}>ioc-graph-for2020</a></li>