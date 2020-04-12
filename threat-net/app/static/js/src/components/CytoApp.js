
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
  }

  setCyData = data => {
    this.setState({ cyData: data })
  }

  setData = data => {
    this.setState({ elements: eval(data) });
  }

  render() {
    return (
      <main>
        <div id="search-bar-container">
          <SearchBar />
        </div>
        <div id="graph-button-container">
          <NewButton setData={this.setData}/>
          <SaveButton cyData={this.state.cyData} />
          <NodeDetailsPane cyData={this.state.cyData} />
          <LoadButton elements={this.state.elements} setData={this.setData} />
        </div>
        <div id="side-pane">
          <div id="add-node-menu">
            <h2 className="sidebar-title">Add Node</h2>
            <hr className="sidebar-divider"></hr>
            <div style={{height: "150px"}}></div>
            <h2 className="sidebar-title">Node Details</h2>
            <hr className="sidebar-divider"></hr>
            <div style={{height: "150px"}}></div>
          </div>
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



