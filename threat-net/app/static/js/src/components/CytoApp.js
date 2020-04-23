
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Cytoscape from './Cytoscape'
import SaveButton from './SaveButton'
import LoadButton from './LoadButton'
import SearchBar from './SearchBar'
import NewButton from './NewButton'
import NodeDetailsPane from './NodeDetailsPane'
import {elements} from "react-cytoscapejs/src/defaults";


class CytoApp extends React.Component {
  state = {
    cyData: [],
    elements: [],
  };

  setCyData = data => {
    this.setState({ cyData: data })
  };

  setData = data => {
    this.setState({ elements: eval(data) });
  };

  addElement = data => {
      console.log("Data received by CytoApp:");
      console.log(data);

      //Assign label equal to SHA so it is displayed when node is clicked
      var data_parsed = JSON.parse(data);
      data_parsed["label"] = data_parsed["sha256"]; 

      this.setState({
          elements: [...this.state.elements, {
            group: 'nodes',
            data: data_parsed,
            position: { x: Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 800) }
          }]
      });

      console.log("elements after addition:");
      console.log(this.state.elements);
  };

  render() {
    return (
      <main>
        <div id="search-bar-container">
          <SearchBar addElement={this.addElement} />
        </div>
        <div id="graph-button-container">
          <NewButton setData={this.setData}/>
          <SaveButton cyData={this.state.cyData} />
          <NodeDetailsPane cyData={this.state.cyData} />
          <LoadButton elements={this.state.elements} setData={this.setData} />
        </div>
        <div id="graph-pane">
          <Cytoscape elements={this.state.elements} setCyData={this.setCyData} />
        </div>
        <ToastContainer autoClose={4000} position={"bottom-right"} pauseOnFocusLoss={false}/>
      </main>
    )
  };

}


export default CytoApp;



