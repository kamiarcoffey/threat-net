import React from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { toast } from 'react-toastify'

import ExpandModal from "./ExpandModal";

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
    elements={this.props.elements} style={ { width: '100vw', height: 'calc(100vh - 50px)' } }/>,
    show: false,
    dropdownList: [],
    selectedKey: "",
  }

  
  static getDerivedStateFromProps(props, state) {
    if (props.elements != state.elements) {
      return {
        elements: props.elements,
        cyto: state.cyto,
        show: state.show,
        dropdownList: state.dropdownList,
        selectedKey: state.selectedKey,
      };
    }
    return state;
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.elements !== this.state.elements) {
      this.cy.elements().remove();
      this.cy.add(this.state.elements);
      this.setCyData(this.cy.elements().jsons());
    }
  }
  
  setCyData = data => {
    this.props.setCyData(data);
  }

  setData = data => {
    this.props.setData(data);
  }

  doubleClickAction = () => {
    var json_data = this.cy.$(':selected').json();
    const removeList = ['_id', 'id', 'label', 'sha256', 'source_collection'];
    var dropdownKeys = [];
    for(const field of Object.keys(json_data.data)){
      if(!removeList.includes(field)){
        dropdownKeys.push({value: field, name: field});
      }
    }
    this.setState({ dropdownList: dropdownKeys });
    this.showModal();
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  updateDropdown = (event) => {
    this.setState({ selectedKey: event.target.value });
  }

  addExpandedNodes = (data, json_data, key_type) => {
    const source_collection = json_data.data.source_collection;
    var currentShas = [];
    for (var i in this.state.elements) {
      currentShas.push(this.state.elements[i].data.sha256);
    }
    var elementsToAdd = [];
    for (var i in data) {
      if (currentShas.includes(data[i].sha256)) {
        // I apologize for how awful this if-statement is
        if(this.cy.filter(`[sha256 = '${data[i].sha256}']`).connectedEdges().sources().filter(`[sha256 = '${json_data.data.sha256}']`).length > 0 
        || this.cy.filter(`[sha256 = '${data[i].sha256}']`).connectedEdges().targets().filter(`[sha256 = '${json_data.data.sha256}']`).length > 0) {
            console.log('SHA connection already exists');
        } else {
          elementsToAdd.push(
            {
              group: 'edges',
              data: {
                // Add label specifying shared connection here? 
                label: '',
                id: `${data[i].sha256}-${json_data.data.sha256}-${key_type}`,
                source: `${source_collection}-${data[i].sha256}`,
                target: json_data.data.sha256,
              }
            }
          );
        }
      } else {
        elementsToAdd.push(
          {
            group: 'nodes',
            data: { ...data[i], label: `${source_collection}-${data[i].sha256}`, id: `${source_collection}-${data[i].sha256}` },
            position: { x: Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 800) },
          }
        );
        elementsToAdd.push(
          {
            group: 'edges',
            data: {
              // Add label specifying shared connection here? 
              label: '',
              id: `${data[i].sha256}-${json_data.data.sha256}-${key_type}`,
              source: `${source_collection}-${data[i].sha256}`,
              target: `${source_collection}-${json_data.data.sha256}`,
            }
          }
        );
      }
    }
    this.hideModal();
    this.setData([...this.state.elements, ...elementsToAdd]);
    toast.success(`Node Successfully Expanded`);
  }

  expandNode = () => {
    var json_data = this.cy.$(':selected').json();
    $.ajax({
      type : "GET",
      url : `/API/IOC/ExpandNodeByKey?sha256=${json_data.data.sha256}&collection=${json_data.data.source_collection}&key_type=${this.state.selectedKey}&key_value=${encodeURIComponent(JSON.stringify(json_data.data[this.state.selectedKey]))}`,
      dataType: "json",
      context: this,
      success: function (data) {
        if (data.length === 0) {
          toast.warn(`Warning: No nodes returned, no matches to specified key.`);
        } else {
          this.addExpandedNodes(data, json_data, this.state.selectedKey);
        }
      },
      error: function(response) {
          toast.error(`Unable to expand node. Error: ${response}`);
      },
    });
  }

  interactWithGraph = () => {
    this.setCyData(this.cy.elements().jsons());
  }
 
  constructor(props){
    super(props);
  }

  render(){
    return (
      <main>
        <div className = "CytoContainer" onClick={this.interactWithGraph} onDoubleClick={this.doubleClickAction}>
            {this.state.cyto}
        </div>
        <ExpandModal onClose={this.hideModal} show={this.state.show}>
          <label>Expand On Key: </label>
          <select name="expandKey" value={this.state.selectedKey} onChange={this.updateDropdown}>
            <option value=""></option>
          {this.state.dropdownList.map((e, key) => {
              return <option key={key} value={e.value}>{e.name}</option>;
          })}
          </select>
          <button id="modal-load-button" type="button" onClick={this.expandNode}>Expand Node</button>
        </ExpandModal>
      </main>
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