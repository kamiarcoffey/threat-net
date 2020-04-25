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

  doubleClickAction = () => {
    var json_data = this.cy.$(':selected').json();
    const removeList = ['_id', 'id', 'label', 'sha256'];
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

  expandNode = () => {
    this.hideModal();
    var json_data = this.cy.$(':selected').json();
    $.ajax({
      type : "GET",
      url : `/API/IOC/ExpandNodeByKey?sha256=${json_data.data.sha256}&key_type=${this.state.selectedKey}&key_value=${encodeURIComponent(JSON.stringify(json_data.data[this.state.selectedKey]))}`,
      dataType: "json",
      context: this,
      success: function (data) {
          // this.cy.add(data);
          console.log('Data to be added', data);
          toast.success(`Node Successfully Expanded`);
          },
      error: function(response) {
          toast.error(`Unable to expand node. Error: ${response}`)
          },
      },
    );
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