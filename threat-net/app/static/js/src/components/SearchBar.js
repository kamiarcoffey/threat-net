import React, { Component } from 'react'
import {toast} from "react-toastify";
import CytoApp from "./CytoApp";

class SearchBar extends Component {
    constructor(props) {
    super(props);
    this.state = {
        value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    addElement = data => {
        this.props.addElement(data);
    };

    handleChange(event) {
    this.setState({value: event.target.value});
    }

    handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    }

    querySHA = () => {
        $.ajax({
            type : "GET",
            url : `/API/IOC/queryDetails/fs/${this.state.value}`,
            context: this,
            success: function (data) {
                console.log("Response received from ajax call:")
                console.log(data);
                this.addElement(data);
                toast.success(`Node successfully loaded.`);
                },
            error: function(response) {
                toast.error(`Unable to load node. Error: ${response}`)
                },
            },
        );
        this.setState({value: ''});
    };

    render() {
        return (
            <main>
                <input id="search-bar" type="text" className="search-bar"  value={this.state.value} onChange={this.handleChange} placeholder="Search..." />
                <button id="search-button" type="button" onClick={this.querySHA}>Search</button>
            </main>
        )
    }
}

export default SearchBar;