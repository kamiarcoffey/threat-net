import React, { Component } from 'react'
import {toast} from "react-toastify";

class SearchBar extends Component {
    constructor(props) {
    super(props);
    this.state = {
        value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    setData = data => {
        this.props.setData(data);
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
                this.setData(data);
                toast.success(`Node with SHA ${this.state.value} successfully loaded.`);
                },
            error: function(response) {
                toast.error(`Unable to load node with SHA ${this.state.value}. Error: ${response}`)
                },
            },
        );
    };

    render() {
        return (
            <form onSubmit={this.querySHA}>
                <input id="search-bar" type="text" className="search-bar"  value={this.state.value} onChange={this.handleChange} placeholder="Search..." />
                <button id="search-button" value="Submit" type="submit" onClick={this.querySHA}>
                    Search
                </button>
            </form>
        )
    }
}

export default SearchBar;