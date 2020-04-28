
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

  addElement = (data, source) => {
    //Assign label equal to SHA so it is displayed when node is clicked
    var data_parsed = JSON.parse(data);
    data_parsed["label"] = `${source}-${data_parsed["sha256"]}`; 
    data_parsed["id"] = `${source}-${data_parsed["sha256"]}`;
    data_parsed["source_collection"] = source;

    if (this.state.cyData.some(e => e.data.id === data_parsed["id"])) {
      toast.warn('Node with specified SHA and Collection has already been added to this graph.')
    } else {
      this.setState({
        elements: [...this.state.elements, {
          group: 'nodes',
          data: data_parsed,
          position: { x: Math.floor(Math.random() * 950) + 50, y: Math.floor(Math.random() * 750) + 50 },
        }]
      });
      toast.success(`Node successfully loaded.`);
    }
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
          <Cytoscape elements={this.state.elements} setCyData={this.setCyData} setData={this.setData} />
        </div>
        <ToastContainer autoClose={4000} position={"bottom-right"} pauseOnFocusLoss={false}/>
      </main>
    )
  };

}


export default CytoApp;