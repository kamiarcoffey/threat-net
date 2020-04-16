import React from 'react';
import ReactDOM from 'react-dom';
import CytoApp from './src/components/CytoApp';
import 'normalize.css/normalize.css';
import './src/styles/styles.scss';
import LoadButton from "./src/components/LoadButton";
import SaveButton from "./src/components/SaveButton";
import Cytoscape from "./src/components/Cytoscape";
import NodeDetailsPane from './src/components/NodeDetailsPane';

// import 'bootstrap/dist/css/bootstrap.min.css';
// ReactDOM.render(<SaveButton/>, document.getElementById('save-graph'))
ReactDOM.render(<CytoApp/>, document.getElementById('reactEntry'));

// ReactDOM.render(<Cytoscape/>, document.getElementById('reactEntry'));

// window.addEventListener('DOMContentLoaded', function () {
//   const exampleProps = {
//     id: 'cy',
//     className: 'foo bar',
//     style: {
//       'border': '1px solid #ccc',
//       'width': '400px',
//       'height': '400px'
//     },
//     global: 'cy',
//     elements: [
//       { data: { id: 'a', label: 'apple' }, position: { x: 0, y: 0 } },
//       { data: { id: 'b', label: 'banana' }, position: { x: 100, y: 0 } },
//       { data: { id: 'c', label: 'cherry' }, position: { x: 200, y: 0 } }
//     ],
//     layout: {
//       name: 'preset'
//     }
//   };

//   class TestComponent extends React.Component {
//     constructor(props) {
//       super(props);

//       props.setStateRef(this.setState.bind(this));

//       this.state = exampleProps;
//     }

//     render() {
//       return React.createElement(ReactCytoscape, this.state);
//     }
//   }

//   const textBox = document.getElementById('props');
//   const btn = document.getElementById('update');

//   btn.addEventListener('click', () => {
//     update(JSON.parse(textBox.value));
//   });

//   let update;

//   ReactDOM.render(
//     React.createElement(TestComponent, { setStateRef: ref => update = ref }),
//     document.getElementById('graph')
//   );

//   textBox.value = JSON.stringify(exampleProps, null, 2);
// });