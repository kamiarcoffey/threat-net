import React, { Component } from 'react'
import {toast} from "react-toastify";
import CytoApp from "./CytoApp";

class SearchBar extends Component {
    constructor(props) {
    super(props);
    this.state = {
        value: '',
        collectionToQuery: 'fs',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    addElement = (data, source) => {
        this.props.addElement(data, source);
    };

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleSelectChange(event) {
        this.setState({
            collectionToQuery: event.target.value,
        });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    querySHA = () => {
        $.ajax({
            type : "GET",
            url : `/API/IOC/queryDetails/${this.state.collectionToQuery}/${this.state.value}`,
            context: this,
            success: function (data) {
                this.addElement(data, this.state.collectionToQuery);
            },
            error: function(response) {
                toast.error(`Unable to load node. Error: ${response}`)
            },
        });
        this.setState({value: ''});
    };

    render() {
        return (
            <main>
                <input id="search-bar" type="text" className="search-bar"  value={this.state.value} onChange={this.handleChange} placeholder="Search..." />
                <select id="collection-select" defaultValue={this.state.collectionToQuery} onChange={this.handleSelectChange}>
                    <option value='fs'>filesystem</option>
                    <option value='reg'>registry</option>
                </select>
                <button id="search-button" type="button" onClick={this.querySHA}>Search</button>
            </main>
        )
    }
}

export default SearchBar;