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

let idArray = [];

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

    
    componentDidMount() {
        if (localStorage.hasOwnProperty('graphs')){
            var graphs = JSON.parse(localStorage.getItem("graphs"));
            idArray = graphs;
        }
      }

    saveIdArray = () => {
        if(!(idArray.includes(parseInt(this.state.graphId))) && idArray.length < 10){     // if graph id not in recent memory and cap of 10
            idArray.push(parseInt(this.state.graphId));
            localStorage.setItem("graphs", JSON.stringify(idArray));      
    }
        else if(!(idArray.includes(parseInt(this.state.graphId))) && idArray.length >= 10){   // pop and push

            idArray.shift();
            idArray.push(parseInt(this.state.graphId));
            localStorage.setItem("graphs", JSON.stringify(idArray));
        }
      };

    
    loadGraph = (newGraph) => {
        $.ajax({
            type : "GET",
            url : `/graph/loadGraph?id=${newGraph}`, 
            context: this,
            success: function (data) {
                this.setData(data);
                this.hideModal();
                toast.success(`Graph with ID ${newGraph} successfully loaded.`);
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

    componentWillUnmount() {
        this._isMounted = false;
      }
    

    loadGraphList = () => {
        $.ajax({
            type : "GET",
            url: '/graph/graphList',
            context: this,
            success: function(data){
                if(Object.keys(this.state.graphList).length != Object.keys(JSON.parse(data)).length){
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
        var graphList = this.state.graphList;

        if (localStorage.hasOwnProperty('graphs')){
            var graphs = JSON.parse(localStorage.getItem("graphs"));
            idArray = graphs;
        }

        return (
            <main>
                <button id="graph-load-button" type="button" onClick={this.showModal}>
                    Load
                </button>
                <LoadModal onClose={this.hideModal} show={this.state.show} >
                    <label>Graph ID</label>
					<input type="text" id="graphid" value={this.state.graphId} onChange={(e) => this.handleIdOnChange(e)}></input>
                    <button id="modal-load-button" type="button" onClick={() => {this.loadGraph(this.state.graphId); this.saveIdArray()}}>Load Graph</button>
                    <hr style = {hrStyle}></hr>
                    <h4><span style={spanStyle}>Or Choose A Recent Graph
                    </span>
                    </h4>
                    <ul style = {styles}>
                        {Array.isArray(idArray) && idArray.map((thisId) => {
                            return (
                                <li key = {thisId}><a onClick = {() => {this.setState({graphId: thisId}, () => this.loadGraph(thisId))}} style = {listItemStyles}>{graphList[thisId]}</a></li>
                            )
                        })}     
                    </ul>
                </LoadModal>
            </main>
        )
    }
}

export default LoadButton;


