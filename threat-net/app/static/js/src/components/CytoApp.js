
import React from 'react'
import Cytoscape from './Cytoscape'
import SaveButton from './SaveButton'
import LoadButton from './LoadButton'

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
        <SaveButton cyData={this.state.cyData} />
        <LoadButton elements={this.state.elements} setData={this.setData} />
        <Cytoscape elements={this.state.elements} setCyData={this.setCyData} />
      </main>
    )
  };

}


export default CytoApp;