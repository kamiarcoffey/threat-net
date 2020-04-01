import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs';
// import nodeHtmlLabel from 'cytoscape-node-html-label';



let elements = [
    { data: { id: 'ioc1', label: 'IOC 1' }, position: { x: 150, y: 400 } },
    { data: { id: 'ioc2', label: 'IOC 2' }, position: { x: 250, y: 50  } },
    { data: { id: 'ioc3', label: 'IOC 3' }, position: { x: 250, y: 200 } },
    { data: { id: 'ioc4', label: 'IOC 4' }, position: { x: 350, y: 200 } },
    { data: { id: 'ioc5', label: 'IOC 5' }, position: { x: 150, y: 300 } },
    { data: { id: 'ioc6', label: 'IOC 6' }, position: { x: 250, y: 300 } },
    { data: { id: 'ioc7', label: 'IOC 7' }, position: { x: 350, y: 400 } },


    {
      data: { source: 'ioc1', target: 'ioc2', label: '1 -> 2' }
    },
    {
      data: { source: 'ioc1', target: 'ioc3', label: '1 -> 3' }
    },
    {
      data: { source: 'ioc1', target: 'ioc4', label: '1 -> 4' }
    },
    {
      data: { source: 'ioc1', target: 'ioc5', label: '1 -> 5' }
    },
    {
      data: { source: 'ioc1', target: 'ioc6', label: '1 -> 6' }
    },
    {
      data: { source: 'ioc1', target: 'ioc7', label: '1 -> 7' }
    },
    {
      data: { source: 'ioc2', target: 'ioc5', label: '2 -> 5' }
    },
    {
      data: { source: 'ioc3', target: 'ioc4', label: '3 -> 4' }
    },
];

let cy = <CytoscapeComponent className = "CytoscapeGraph"
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

elements={elements} style={ { width: 'calc(100vw - 400px)', height: 'calc(100vh - 50px)' } }

class Cytoscape extends React.Component {
    constructor(props){
      super(props);
    }
  
    render(){
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
//AddNode({ data: { id: 'three', label: 'Node 3' }, position: { x: 250, y: 300 } });

  export default Cytoscape;