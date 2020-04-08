
import React from 'react'
import Cytoscape from './Cytoscape'
import SaveButton from './SaveButton'
import LoadButton from './LoadButton'
import SearchBar from './SearchBar'
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
    console.log(this.state.elements)
  }

  render() {
    return (
      <main>
        <div id="search-bar-container">
          <SearchBar />
        </div>
        <div id="graph-button-container">
          {/*Filler button to add a new graph. This will become a React component later.*/}
          <button id="graph-new-button" type="button" >New</button>
          <SaveButton cyData={this.state.cyData} />
          <NodeDetailsPane cyData={this.state.cyData} />
          <LoadButton elements={this.state.elements} setData={this.setData} />
        </div>
        <Cytoscape elements={this.state.elements} setCyData={this.setCyData} />
      </main>
    )
  };

}


export default CytoApp;



