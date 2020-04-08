import React, { Component } from 'react'

class SearchBar extends Component {
    constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
    this.setState({value: event.target.value});
    }

    handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input id="search-bar" type="text" className="search-bar"  value={this.state.value} onChange={this.handleChange} placeholder="Search..." />
                <button id="search-button" value="Submit" type="submit" onClick={this.loadGraph}>
                    Search
                </button>
            </form>
        )
    }
}

export default SearchBar;