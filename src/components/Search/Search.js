import React from 'react';
import './Search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {term: ''}
		this.handleSearch = this.handleSearch.bind(this);
		this.handleEnter = this.handleEnter.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
	}

	handleEnter(e) {
		// do we need it?
		// e.preventDefault();
		if (e.keyCode === 13) {
			// either trigger click
			// document.getElementById("searchButton").click();
			// or call searchSpotify, better as I am avoiding more calls?
			this.props.searchSpotify(this.state.term);

		}
	}

	handleSearch(e) {
		this.props.searchSpotify(this.state.term);
	}

	handleTermChange(e){
		const newTerm = e.target.value;
		this.setState({
			term: newTerm
		});
	}

	render() {
		return (
			<div className='Search'>
				<input placeholder="Enter a Song, Album, or Artist" onChange={this.handleTermChange} onKeyUp={this.handleEnter} />
				<a id="searchButton" onClick={this.handleSearch}>Search</a>
			</div>
		)
	}
}

export default Search;