import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs';

let elements = [
  { data: { id: 'one', label: 'Node 1' }, position: { x: 300, y: 300 } },
  { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 400 } },
  { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
];

let cy = <CytoscapeComponent className = "CytoscapeGraph"
stylesheet={[
    {
    selector: 'node',
    style: {
        width: 30,
        height: 20,
        shape: 'square'
    }
    },
    {
    selector: 'edge',
    style: {
        width: 5
    }
    }
]}  
elements={elements} style={ { width: '500px', height: '500px' } }
/>

class Cytoscape extends React.Component {
    constructor(props){
      super(props);
    }
  
    render(){
      // const elements = [
      //    { data: { id: 'one', label: 'Node 1' }, position: { x: 300, y: 300 } },
      //    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 400 } },
      //    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
      // ];
  
      return (
        <div className = "CytoContainer">
            {cy}
      </div>)
    }
  }
  

const FindNode = (givenId) => {
  for (let i = 0; i < elements.length; i++) {
    var element = elements[i];
    if(element.data.id === givenId){
      return element;
    }
  }return false;
}  


const AddNode = (object = {}) => {
  elements.push(object);
}

console.log(FindNode('one'));
AddNode({ data: { id: 'three', label: 'Node 3' }, position: { x: 250, y: 300 } });

  export default Cytoscape;