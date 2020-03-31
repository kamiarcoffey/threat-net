import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


export default class Header extends React.Component {
    render(){
        return (
            <div className = "header">
            <FontAwesomeIcon icon={faCoffee} color = "#4BA9EA" size = "4x" className = "icon"/>
            <i className="fab fa-twitter"></i>
                <h1 style={{color: "#4BA9EA"}}>This is the beginning of Cytoscape project</h1>
            </div>
        )
    }
}