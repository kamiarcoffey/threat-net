
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Cytoscape from './Cytoscape'
import SaveButton from './SaveButton'
import LoadButton from './LoadButton'
import SearchBar from './SearchBar'
import NewButton from './NewButton'
import NodeDetailsPane from './NodeDetailsPane'


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

      //This is where the issue is. The graph is not being updated with what gets pushed here.
      this.state.elements.push({
        group: 'nodes',
        data: {
            weight: 75,
            response: data
        },
        position: { x: 200, y: 200 }
      });

      console.log("elements after addition:");
      console.log(this.state.elements);
  };

  render() {
    return (
      <main>
        <div id="search-bar-container">
          <SearchBar addEmelemt={this.addElement} />
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
        <ToastContainer autoClose={4000} pauseOnFocusLoss={false}/>
      </main>
    )
  };

}


export default CytoApp;



