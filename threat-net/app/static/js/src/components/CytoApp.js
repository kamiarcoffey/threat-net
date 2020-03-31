
import React from 'react'
import Cytoscape from './Cytoscape'
import Header from './Header'


class CytoApp extends React.Component {

    render(){
        return (
            <div>
                <Header />
                <div className = "CytoContainer">
                    <div className = "nodeInfo">What goes here?</div>
                    <Cytoscape />
                    <div className = "nodeFilter">Filter?</div>
                </div>
            </div>
        )
    };

}


export default CytoApp;