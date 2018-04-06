import React from 'react';
import './Search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = {term: ''}
		this.handleSearch = this.handleSearch.bind(this);
		this.handleTermChange = this.handleTermChange.bind(this);
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
				<input placeholder="Enter a Song, Album, or Artist" onChange={this.handleTermChange}/>
				<a onClick={this.handleSearch}>Search</a>
			</div>
		)
	}
}

export default Search;