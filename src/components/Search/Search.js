import React from 'react';
import './Search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {term: ''}
		this.handleSearch = this.handleSearch.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
	}

	handleKeyPress(e) {
		if (e.key === 'Enter') {
			// either trigger click
			// document.getElementById("searchButton").click();
			// or call searchSpotify
			// this may be better beacuse it avoids another event which does the same thing
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
				<input placeholder="Enter a Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} />
				<a id="searchButton" onClick={this.handleSearch}>Search</a>
			</div>
		)
	}
}

export default Search;