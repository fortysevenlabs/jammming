import React from 'react';
import './Search.css';

class Search extends React.Component {
	render() {
		return (
			<div className='Search'>
				<input placeholder="Enter a Song, Album, or Artist" />
				<a>Search</a>
			</div>
		)
	}
}

export default Search;