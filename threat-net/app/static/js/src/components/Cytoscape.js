import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs';

class Cytoscape extends React.Component {
  cy = {}
  state = {
    elements: [],
    cyto: <CytoscapeComponent cy={(cy) => {this.cy = cy}} className = "CytoscapeGraph"
    stylesheet={[
      {
      layout: {
        name: 'random'
      },
    selector: 'node',
    style: {
      // 'background-color': 'data(color)',
      'label': 'data(label)',
      'font-size' : '25px',
      // 'width' : 'data(size)',
      // 'height' : 'data(size)',
      },
      // },
      // {
      // selector: 'edge',
      // style: {
      //     width: 5
      // },
      selector: ':selected',
        css: {
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black'
        }
      }
      ]}
    elements={this.props.elements} style={ { width: 'calc(100vw - 370px)', height: 'calc(100vh - 50px)' } }/>  }

  
  static getDerivedStateFromProps(props, state) {
    if (props.elements != state.elements) {
      return {
        elements: props.elements,
        cyto: state.cyto
      };
    }
    return state;
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.elements !== this.state.elements) {
      this.cy.removeData();
      this.cy.add(this.state.elements);
      this.setCyData(this.cy.elements().jsons());
    }
  }
  
  setCyData = data => {
    this.props.setCyData(data);
  }

  interactWithGraph = () => {
    this.setCyData(this.cy.elements().jsons());
  }
  
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className = "CytoContainer" onClick={this.interactWithGraph}>
          {this.state.cyto}
      </div>
    )
  }
}
  

// const FindNode = (givenId) => {
//   for (let i = 0; i < this.props.elements.length; i++) {
//     var element = this.props.elements[i];
//     if(element.data.id === givenId){
//       return element;
//     }
//   }return false;
// }  


// const AddNode = (object = {}) => {
//   this.props.elements.push(object);
// }



// console.log(FindNode('one'));
//AddNode({ data: { id: 'three', label: 'Node 3' }, position: { x: 250, y: 300 } });

  export default Cytoscape;